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
      {/* Sidebar */}
      <Sidebar 
        onLogout={onLogout}
        user={user}
        onNavigate={onNavigate}
        currentRoute={currentRoute}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Top bar */}
        <TopBar 
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          onMobileMenuClick={() => setSidebarOpen(true)}
        />

        {/* Content area */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
