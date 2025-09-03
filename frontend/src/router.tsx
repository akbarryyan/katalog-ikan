// Router for Admin Application
import { useState, useEffect } from 'react';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import FormIkan from './components/FormIkan';

import ManageIkan from './pages/ManageIkan';
import Settings from './pages/Settings';
import PageTransition from './components/PageTransition';

// Route types
export type Route = 'login' | 'dashboard' | 'tambah-ikan' | 'edit-ikan' | 'kelola-ikan' | 'settings';

// Router component
export const Router = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [editData, setEditData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Memuat halaman...');

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
        if (['dashboard', 'tambah-ikan', 'edit-ikan', 'kelola-ikan', 'settings'].includes(route)) {
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
        if (['dashboard', 'tambah-ikan', 'edit-ikan', 'kelola-ikan', 'settings'].includes(route)) {
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
    
    // Set loading state
    setIsLoading(true);
    
    // Set appropriate loading message based on route
    switch (route) {
      case 'dashboard':
        setLoadingMessage('Memuat Dashboard...');
        break;
      case 'kelola-ikan':
        setLoadingMessage('Memuat Kelola Ikan...');
        break;
      case 'tambah-ikan':
        setLoadingMessage('Memuat Form Tambah Ikan...');
        break;
      case 'edit-ikan':
        setLoadingMessage('Memuat Form Edit Ikan...');
        break;
      case 'settings':
        setLoadingMessage('Memuat Pengaturan...');
        break;
      default:
        setLoadingMessage('Memuat halaman...');
    }
    
    // Simulate loading time for smooth transition
    setTimeout(() => {
      setCurrentRoute(route);
      
      // Update URL based on route
      if (route === 'dashboard') {
        window.history.pushState({}, '', '/');
        console.log('URL updated to: /');
      } else {
        window.history.pushState({}, '', `/${route}`);
        console.log('URL updated to:', `/${route}`);
      }
      
      // Hide loading after a short delay for smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }, 800); // Total loading time: 800ms + 200ms = 1 second
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
    
    // Set loading for login transition
    setIsLoading(true);
    setLoadingMessage('Memuat Dashboard...');
    
    setTimeout(() => {
      navigate('dashboard');
    }, 500);
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoading(true);
    setLoadingMessage('Logging out...');
    
    setTimeout(() => {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminUser');
      setCurrentRoute('login');
      setIsLoading(false);
    }, 800);
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
        <PageTransition isLoading={isLoading} loadingMessage={loadingMessage}>
          <AdminDashboard 
            onLogout={handleLogout} 
            user={user}
            onNavigate={navigate}
          />
        </PageTransition>
      );

    case 'tambah-ikan':
      return (
        <PageTransition isLoading={isLoading} loadingMessage={loadingMessage}>
          <FormIkan
            mode="add"
            onCancel={() => navigate('dashboard')}
            onSave={(data) => {
              console.log('Data ikan baru:', data);
              // TODO: Implement save logic
              navigate('dashboard');
            }}
          />
        </PageTransition>
      );

    case 'edit-ikan':
      return (
        <PageTransition isLoading={isLoading} loadingMessage={loadingMessage}>
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
        </PageTransition>
      );

    case 'kelola-ikan':
      console.log('Rendering ManageIkan route');
      return (
        <PageTransition isLoading={isLoading} loadingMessage={loadingMessage}>
          <ManageIkan 
            onLogout={handleLogout}
            user={user}
            onNavigate={navigate}
          />
        </PageTransition>
      );

    case 'settings':
      console.log('Rendering Settings route');
      return (
        <PageTransition isLoading={isLoading} loadingMessage={loadingMessage}>
          <Settings 
            onLogout={handleLogout}
            user={user}
            onNavigate={navigate}
          />
        </PageTransition>
      );

    default:
      return <AdminLogin onLogin={handleLogin} />;
  }
};

// Export router component
export default Router;
