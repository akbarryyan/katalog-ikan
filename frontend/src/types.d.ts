declare module './components/AdminLogin' {
  interface AdminLoginProps {
    onLogin: (credentials: { username: string; password: string }) => void;
  }
  
  const AdminLogin: React.FC<AdminLoginProps>;
  export default AdminLogin;
}

declare module './components/AdminDashboard' {
  interface AdminDashboardProps {
    onLogout: () => void;
    user: { username: string } | null;
  }
  
  const AdminDashboard: React.FC<AdminDashboardProps>;
  export default AdminDashboard;
}
