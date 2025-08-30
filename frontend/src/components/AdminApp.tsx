import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  const handleLogin = (credentials: { username: string; password: string }) => {
    // Demo login logic
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setUser({ username: credentials.username });
      setIsLoggedIn(true);
    } else {
      alert('Username atau password salah! Gunakan admin/admin123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} user={user} />;
};

export default AdminApp;
