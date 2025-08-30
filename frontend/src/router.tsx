// Router for Admin Application
import { useState, useEffect } from 'react';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import FormIkan from './components/FormIkan';
import TabelIkan from './components/TabelIkan';

// Route types
export type Route = 'login' | 'dashboard' | 'tambah-ikan' | 'edit-ikan' | 'kelola-ikan';

// Router component
export const Router = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [editData, setEditData] = useState<any>(null);

  // Check login status on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    const userData = localStorage.getItem('adminUser');
    
    if (loggedIn && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
      setCurrentRoute('dashboard');
    }
  }, []);

  // Navigation functions
  const navigate = (route: Route) => {
    setCurrentRoute(route);
  };

  const navigateToEdit = (ikan: any) => {
    setEditData(ikan);
    setCurrentRoute('edit-ikan');
  };

  // Login handler
  const handleLogin = (credentials: { username: string; password: string }) => {
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const userData = { username: credentials.username };
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminUser', JSON.stringify(userData));
      setCurrentRoute('dashboard');
    } else {
      alert('Username atau password salah! Gunakan admin/admin123');
    }
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
      return (
        <TabelIkan
          onEdit={(ikan) => {
            console.log('Edit ikan:', ikan);
            navigateToEdit(ikan);
          }}
          onDelete={(id) => {
            console.log('Delete ikan dengan ID:', id);
            if (confirm('Apakah Anda yakin ingin menghapus ikan ini?')) {
              // TODO: Implement delete logic
              window.location.reload();
            }
          }}
          onAdd={() => navigate('tambah-ikan')}
        />
      );

    default:
      return <AdminLogin onLogin={handleLogin} />;
  }
};

// Export router component
export default Router;
