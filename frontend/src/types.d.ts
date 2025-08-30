// Type declarations for the admin application

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
    onNavigate: (route: 'dashboard' | 'tambah-ikan' | 'kelola-ikan') => void;
  }
  
  const AdminDashboard: React.FC<AdminDashboardProps>;
  export default AdminDashboard;
}

declare module './components/FormIkan' {
  interface FormIkanProps {
    mode: 'add' | 'edit';
    onCancel: () => void;
    onSave: (data: any) => void;
    initialData?: any;
  }
  
  const FormIkan: React.FC<FormIkanProps>;
  export default FormIkan;
}

declare module './components/TabelIkan' {
  interface TabelIkanProps {
    onEdit: (ikan: any) => void;
    onDelete: (id: string) => void;
    onAdd: () => void;
  }
  
  const TabelIkan: React.FC<TabelIkanProps>;
  export default TabelIkan;
}
