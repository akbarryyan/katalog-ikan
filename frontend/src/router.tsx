// Router for Admin Application
import { useState, useEffect } from 'react';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import FormIkan from './components/FormIkan';
import TabelIkan from './components/TabelIkan';
import ManageIkan from './pages/ManageIkan';

// Route types
export type Route = 'login' | 'dashboard' | 'tambah-ikan' | 'edit-ikan' | 'kelola-ikan';

// Router component
export const Router = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [editData, setEditData] = useState<any>(null);

  // Check login status on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    const userData = localStorage.getItem('adminUser');
    
    if (loggedIn && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
      
      // Check current URL to set initial route
      const path = window.location.pathname;
      if (path === '/' || path === '') {
        setCurrentRoute('dashboard');
      } else {
        const route = path.substring(1) as Route;
        if (['dashboard', 'tambah-ikan', 'edit-ikan', 'kelola-ikan'].includes(route)) {
          setCurrentRoute(route);
        } else {
          setCurrentRoute('dashboard');
        }
      }
    }
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/' || path === '') {
        setCurrentRoute('dashboard');
      } else {
        const route = path.substring(1) as Route;
        if (['dashboard', 'tambah-ikan', 'edit-ikan', 'kelola-ikan'].includes(route)) {
          setCurrentRoute(route);
        } else {
          setCurrentRoute('dashboard');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation functions
  const navigate = (route: Route) => {
    console.log('Navigating to:', route);
    setCurrentRoute(route);
    
    // Update URL based on route
    if (route === 'dashboard') {
      window.history.pushState({}, '', '/');
      console.log('URL updated to: /');
    } else {
      window.history.pushState({}, '', `/${route}`);
      console.log('URL updated to:', `/${route}`);
    }
  };

  const navigateToEdit = (ikan: any) => {
    setEditData(ikan);
    setCurrentRoute('edit-ikan');
  };

  // Login handler
  const handleLogin = (credentials: { email: string; password: string }) => {
    // Frontend validation sudah tidak diperlukan karena backend sudah handle
    // Data dari backend sudah valid, langsung set user dan redirect
    const userData = { email: credentials.email };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('adminLoggedIn', 'true');
    localStorage.setItem('adminUser', JSON.stringify(userData));
    setCurrentRoute('dashboard');
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUser');
    setCurrentRoute('login');
  };

  // Route protection
  if (!isLoggedIn && currentRoute !== 'login') {
    setCurrentRoute('login');
    return null;
  }

  // Render based on current route
  switch (currentRoute) {
    case 'login':
      return <AdminLogin onLogin={handleLogin} />;

    case 'dashboard':
      return (
        <AdminDashboard 
          onLogout={handleLogout} 
          user={user}
          onNavigate={navigate}
        />
      );

    case 'tambah-ikan':
      return (
        <FormIkan
          mode="add"
          onCancel={() => navigate('dashboard')}
          onSave={(data) => {
            console.log('Data ikan baru:', data);
            // TODO: Implement save logic
            navigate('dashboard');
          }}
        />
      );

    case 'edit-ikan':
      return (
        <FormIkan
          mode="edit"
          onCancel={() => navigate('dashboard')}
          onSave={(data) => {
            console.log('Data ikan yang diedit:', data);
            // TODO: Implement edit logic
            navigate('dashboard');
          }}
          initialData={editData || {
            nama: '',
            harga: '',
            stok: 'tersedia',
            kategori: 'air_tawar',
            ukuran: 'sedang',
            deskripsi: '',
            gambar: null
          }}
        />
      );

    case 'kelola-ikan':
      console.log('Rendering ManageIkan route');
      return (
        <ManageIkan />
      );

    default:
      return <AdminLogin onLogin={handleLogin} />;
  }
};

// Export router component
export default Router;
