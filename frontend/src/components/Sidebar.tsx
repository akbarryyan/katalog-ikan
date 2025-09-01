import { useState } from 'react';
import { 
  Fish, 
  LogOut,
  X,
  Users,
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
  user: { email: string } | null;
  onNavigate: (route: 'dashboard' | 'tambah-ikan' | 'kelola-ikan') => void;
  currentRoute: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ onLogout, user, onNavigate, currentRoute, sidebarOpen, setSidebarOpen }: SidebarProps) => {

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'from-[#00412E] to-[#96BF8A]' },
    { id: 'kelola-ikan', label: 'Kelola Ikan', icon: Fish, color: 'from-[#00412E] to-[#96BF8A]' },
  ];

  const handleLogout = () => {
    onLogout();
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ 
          height: '100vh',
          minHeight: '100vh',
          maxHeight: '100vh'
        }}
      >
        {/* Sidebar Content Container */}
        <div 
          className="flex flex-col"
          style={{ 
            height: '100vh',
            minHeight: '100vh',
            maxHeight: '100vh'
          }}
        >
          {/* Sidebar Header */}
          <div className="flex-shrink-0 flex items-center justify-between h-20 px-6 border-b border-gray-100 bg-white">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-[#00412E] to-[#96BF8A] rounded-xl shadow-lg">
                <Fish className="text-white" size={24} />
              </div>
              <h1 className="text-xl font-bold text-[#00412E]" style={{ fontFamily: 'Hanken Grotesk' }}>
                Ikan Oni
              </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* User Info */}
          <div className="flex-shrink-0 px-6 py-6 border-b border-gray-100 bg-white">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00412E] to-[#96BF8A] rounded-full flex items-center justify-center shadow-lg">
                <Users className="text-white" size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'Hanken Grotesk' }}>
                  {user?.email || 'Admin'}
                </p>
                <p className="text-xs text-[#96BF8A] font-medium" style={{ fontFamily: 'Hanken Grotesk' }}>
                  Administrator
                </p>
              </div>
            </div>
          </div>
          
          {/* Navigation Menu */}
          <nav 
            className="flex-1 px-3 py-6 overflow-y-auto"
            style={{ 
              minHeight: '0',
              height: 'calc(100vh - 248px)'
            }}
          >
            <ul className="space-y-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        if (item.id === 'kelola-ikan') {
                          onNavigate('kelola-ikan');
                        } else {
                          onNavigate('dashboard');
                        }
                      }}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                        currentRoute === item.id
                          ? 'bg-gradient-to-r from-[#00412E] to-[#96BF8A] text-white shadow-lg shadow-[#96BF8A]/25'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-[#00412E] border border-transparent hover:border-gray-200'
                      }`}
                      style={{ fontFamily: 'Hanken Grotesk' }}
                    >
                      <Icon size={20} className={`mr-3 transition-transform duration-200 ${
                        currentRoute === item.id ? 'scale-110' : 'group-hover:scale-105'
                      }`} />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          {/* Logout Button */}
          <div className="flex-shrink-0 p-4 border-t border-gray-100 bg-gray-50/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 group border border-transparent hover:border-red-200"
              style={{ fontFamily: 'Hanken Grotesk' }}
            >
              <LogOut size={20} className="mr-3 group-hover:scale-105 transition-transform duration-200" />
              Keluar
            </button>
          </div>
        </div>
      </div>


    </>
  );
};

export default Sidebar;
