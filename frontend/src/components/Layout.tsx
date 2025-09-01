import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  user: { email: string } | null;
  onNavigate: (route: 'dashboard' | 'tambah-ikan' | 'kelola-ikan') => void;
  currentRoute: string;
}

const Layout = ({ children, onLogout, user, onNavigate, currentRoute }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#E8EAE5]">
      {/* Sidebar - Fixed */}
      <Sidebar 
        onLogout={onLogout}
        user={user}
        onNavigate={onNavigate}
        currentRoute={currentRoute}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main content - Scrollable */}
      <div className="main-content-ultra-scrollable">
        {/* Top bar */}
        <TopBar 
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          onMobileMenuClick={() => setSidebarOpen(true)}
        />

        {/* Content area - This will scroll */}
        <div 
          className="p-6"
          style={{
            minHeight: 'calc(100vh - 80px)', // Adjust based on TopBar height
            overflowY: 'auto'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
