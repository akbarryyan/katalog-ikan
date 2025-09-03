import { useState, useEffect } from 'react';
import { 
  Fish, 
  LogOut,
  X,
  Users,
  BarChart3,
  Settings
} from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
  user: { email: string } | null;
  onNavigate: (route: 'dashboard' | 'tambah-ikan' | 'kelola-ikan' | 'settings') => void;
  currentRoute: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ onLogout, user, onNavigate, currentRoute, sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [websiteName, setWebsiteName] = useState('Ikan Oni');
  const [isMobile, setIsMobile] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'from-[#00412E] to-[#96BF8A]' },
    { id: 'kelola-ikan', label: 'Kelola Ikan', icon: Fish, color: 'from-[#00412E] to-[#96BF8A]' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'from-[#00412E] to-[#96BF8A]' },
  ];

  // Check screen size for responsive z-index
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Load website name from settings API
  useEffect(() => {
    const loadWebsiteName = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/settings/website');
        const result = await response.json();
        
        if (result.success && result.data.websiteName) {
          setWebsiteName(result.data.websiteName);
        }
      } catch (error) {
        console.error('Error loading website name:', error);
        // Keep default name if API fails
      }
    };

    loadWebsiteName();

    // Listen for settings changes (when user updates settings)
    const handleSettingsChange = () => {
      loadWebsiteName();
    };

    // Add event listener for custom settings update event
    window.addEventListener('settingsUpdated', handleSettingsChange);

    return () => {
      window.removeEventListener('settingsUpdated', handleSettingsChange);
    };
  }, []);

  const handleLogout = () => {
    onLogout();
  };

  // Calculate transform based on screen size and sidebar state
  const getTransform = () => {
    if (window.innerWidth >= 1024) {
      // Desktop: always visible
      return 'translateX(0)';
    } else {
      // Mobile: based on sidebarOpen state
      return sidebarOpen ? 'translateX(0)' : 'translateX(-100%)';
    }
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9998
          }}
          className="lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '18rem',
          height: '100vh',
          backgroundColor: 'white',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          zIndex: isMobile ? 9999 : 10, // Higher z-index for mobile
          overflow: 'hidden',
          transform: getTransform(),
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        {/* Sidebar Content Container */}
        <div 
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Sidebar Header */}
          <div style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '5rem',
            padding: '0 1.5rem',
            borderBottom: '1px solid #f3f4f6',
            backgroundColor: 'white'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{
                padding: '0.75rem',
                background: 'linear-gradient(to bottom right, #00412E, #96BF8A)',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <Fish style={{ color: 'white', width: '24px', height: '24px' }} />
              </div>
              <h1 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#00412E',
                fontFamily: 'Hanken Grotesk'
              }}>
                {websiteName}
              </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.5rem',
                color: '#9ca3af',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
              className="lg:hidden"
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>
          </div>
          
          {/* User Info */}
          <div style={{
            flexShrink: 0,
            padding: '1.5rem',
            borderBottom: '1px solid #f3f4f6',
            backgroundColor: 'white'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                background: 'linear-gradient(to bottom right, #00412E, #96BF8A)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <Users style={{ color: 'white', width: '22px', height: '22px' }} />
              </div>
              <div>
                <p style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#111827',
                  fontFamily: 'Hanken Grotesk'
                }}>
                  {user?.email || 'Admin'}
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#96BF8A',
                  fontWeight: '500',
                  fontFamily: 'Hanken Grotesk'
                }}>
                  Administrator
                </p>
              </div>
            </div>
          </div>
          
          {/* Navigation Menu */}
          <nav 
            className="hide-scrollbar"
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '1.5rem 0.75rem'
            }}
          >
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentRoute === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        if (item.id === 'kelola-ikan') {
                          onNavigate('kelola-ikan');
                        } else if (item.id === 'settings') {
                          onNavigate('settings');
                        } else {
                          onNavigate('dashboard');
                        }
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.75rem 1rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        borderRadius: '0.75rem',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: isActive 
                          ? 'linear-gradient(to right, #00412E, #96BF8A)' 
                          : 'transparent',
                        color: isActive ? 'white' : '#4b5563',
                        boxShadow: isActive ? '0 10px 15px -3px rgba(150, 191, 138, 0.25)' : 'none'
                      }}
                    >
                      <Icon 
                        style={{ 
                          width: '20px', 
                          height: '20px', 
                          marginRight: '0.75rem',
                          transform: isActive ? 'scale(1.1)' : 'scale(1)',
                          transition: 'transform 0.2s'
                        }} 
                      />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          {/* Logout Button */}
          <div style={{
            flexShrink: 0,
            padding: '1rem',
            borderTop: '1px solid #f3f4f6',
            backgroundColor: '#f9fafb'
          }}>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#ef4444',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <LogOut style={{ width: '20px', height: '20px', marginRight: '0.75rem' }} />
              Keluar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
