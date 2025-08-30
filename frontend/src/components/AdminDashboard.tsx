import { useState } from 'react';
import { 
  Fish, 
  Plus, 
  Search, 
  Filter, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import FormIkan from './FormIkan';
import TabelIkan from './TabelIkan';

interface AdminDashboardProps {
  onLogout: () => void;
  user: { email: string } | null;
  onNavigate: (route: 'dashboard' | 'tambah-ikan' | 'kelola-ikan') => void;
}

const AdminDashboard = ({ onLogout, user, onNavigate }: AdminDashboardProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Fish },
    { id: 'tambah-ikan', label: 'Tambah Ikan', icon: Plus },
    { id: 'kelola-ikan', label: 'Kelola Ikan', icon: Fish },
  ];

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Hanken Grotesk' }}>
            Admin Panel
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      if (item.id === 'tambah-ikan' || item.id === 'kelola-ikan') {
                        onNavigate(item.id as 'tambah-ikan' | 'kelola-ikan');
                      }
                    }}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={{ fontFamily: 'Hanken Grotesk' }}
                  >
                    <Icon size={20} className="mr-3" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            style={{ fontFamily: 'Hanken Grotesk' }}
          >
            <LogOut size={20} className="mr-3" />
            Keluar
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <Menu size={20} />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Cari ikan..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ fontFamily: 'Hanken Grotesk' }}
                />
              </div>
              
              <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                <Filter size={16} className="mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Hanken Grotesk' }}>
                  Dashboard
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Fish className="text-blue-600" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Hanken Grotesk' }}>
                          Total Ikan
                        </p>
                        <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Hanken Grotesk' }}>
                          24
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Fish className="text-green-600" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Hanken Grotesk' }}>
                          Tersedia
                        </p>
                        <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Hanken Grotesk' }}>
                          18
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                      <div className="p-3 bg-red-100 rounded-lg">
                        <Fish className="text-red-600" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Hanken Grotesk' }}>
                          Habis Stok
                        </p>
                        <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Hanken Grotesk' }}>
                          6
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Hanken Grotesk' }}>
                  Aktivitas Terbaru
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600" style={{ fontFamily: 'Hanken Grotesk' }}>
                      Ikan Gurame ditambahkan
                    </span>
                    <span className="text-xs text-gray-400" style={{ fontFamily: 'Hanken Grotesk' }}>
                      2 jam yang lalu
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600" style={{ fontFamily: 'Hanken Grotesk' }}>
                      Harga Ikan Mas diupdate
                    </span>
                    <span className="text-xs text-gray-400" style={{ fontFamily: 'Hanken Grotesk' }}>
                      5 jam yang lalu
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600" style={{ fontFamily: 'Hanken Grotesk' }}>
                      Ikan Lele dihapus
                    </span>
                    <span className="text-xs text-gray-400" style={{ fontFamily: 'Hanken Grotesk' }}>
                      1 hari yang lalu
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'tambah-ikan' && (
            <FormIkan
              mode="add"
              onCancel={() => setActiveTab('dashboard')}
              onSave={(data) => {
                console.log('Data ikan baru:', data);
                // TODO: Implement save logic
                setActiveTab('dashboard');
              }}
            />
          )}
          
          {activeTab === 'kelola-ikan' && (
            <TabelIkan
              onEdit={(ikan) => {
                console.log('Edit ikan:', ikan);
                // TODO: Implement edit logic
              }}
              onDelete={(id) => {
                console.log('Delete ikan dengan ID:', id);
                // TODO: Implement delete logic
              }}
              onAdd={() => setActiveTab('tambah-ikan')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
