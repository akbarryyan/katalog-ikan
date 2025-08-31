import { useState } from 'react';
import { 
  Fish, 
  Plus, 
  Search, 
  Filter, 
  LogOut,
  Menu,
  X,
  TrendingUp,
  Package,
  AlertCircle,
  BarChart3,
  Users,
  DollarSign
} from 'lucide-react';
import FormIkan from '../components/FormIkan';
import TabelIkan from '../components/TabelIkan';

interface AdminDashboardProps {
  onLogout: () => void;
  user: { email: string } | null;
  onNavigate: (route: 'dashboard' | 'tambah-ikan' | 'kelola-ikan') => void;
}

const AdminDashboard = ({ onLogout, user, onNavigate }: AdminDashboardProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'from-[#00412E] to-[#96BF8A]' },
    { id: 'tambah-ikan', label: 'Tambah Ikan', icon: Plus, color: 'from-[#96BF8A] to-[#00412E]' },
    { id: 'kelola-ikan', label: 'Kelola Ikan', icon: Fish, color: 'from-[#00412E] to-[#96BF8A]' },
  ];

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#E8EAE5]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100">
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
        <div className="px-6 py-6 border-b border-gray-100">
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
        <nav className="mt-6 px-3">
          <ul className="space-y-3">
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
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-[#00412E] to-[#96BF8A] text-white shadow-lg shadow-[#96BF8A]/25'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#00412E] border border-transparent hover:border-gray-200'
                    }`}
                    style={{ fontFamily: 'Hanken Grotesk' }}
                  >
                    <Icon size={20} className={`mr-3 transition-transform duration-200 ${
                      activeTab === item.id ? 'scale-110' : 'group-hover:scale-105'
                    }`} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gray-50/50">
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

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Top bar */}
        <div className="bg-white shadow-lg border-b border-[#96BF8A]/20">
          <div className="flex items-center justify-between h-20 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#00412E] hover:bg-[#E8EAE5] transition-colors duration-200"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#96BF8A]" size={20} />
                <input
                  type="text"
                  placeholder="Cari ikan, kategori, atau harga..."
                  className="pl-12 pr-4 py-3 border border-[#96BF8A]/30 rounded-xl focus:ring-2 focus:ring-[#96BF8A] focus:border-[#96BF8A] transition-all duration-200 w-80"
                  style={{ fontFamily: 'Hanken Grotesk' }}
                />
              </div>
              
              <button className="flex items-center px-4 py-3 text-sm font-medium text-[#00412E] bg-[#96BF8A]/20 rounded-xl hover:bg-[#96BF8A]/30 transition-all duration-200 border border-[#96BF8A]/30">
                <Filter size={18} className="mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-[#00412E] to-[#96BF8A] rounded-2xl p-8 text-white">
                <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                  Selamat Datang, Admin! 👋
                </h2>
                <p className="text-[#E8EAE5] text-lg" style={{ fontFamily: 'Hanken Grotesk' }}>
                  Kelola katalog ikan dan pantau performa penjualan Anda
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#96BF8A]/20 hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#96BF8A]" style={{ fontFamily: 'Hanken Grotesk' }}>
                        Total Ikan
                      </p>
                      <p className="text-3xl font-bold text-[#00412E] mt-1" style={{ fontFamily: 'Hanken Grotesk' }}>
                        24
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-[#00412E] to-[#96BF8A] rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Fish className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm text-[#96BF8A]">
                    <TrendingUp size={16} className="mr-1" />
                    <span>+12% dari bulan lalu</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#96BF8A]/20 hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#96BF8A]" style={{ fontFamily: 'Hanken Grotesk' }}>
                        Tersedia
                      </p>
                      <p className="text-3xl font-bold text-[#00412E] mt-1" style={{ fontFamily: 'Hanken Grotesk' }}>
                        18
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Package className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm text-green-500">
                    <TrendingUp size={16} className="mr-1" />
                    <span>+8% dari bulan lalu</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#96BF8A]/20 hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#96BF8A]" style={{ fontFamily: 'Hanken Grotesk' }}>
                        Habis Stok
                      </p>
                      <p className="text-3xl font-bold text-[#00412E] mt-1" style={{ fontFamily: 'Hanken Grotesk' }}>
                        6
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <AlertCircle className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm text-red-500">
                    <TrendingUp size={16} className="mr-1" />
                    <span>Perlu restock</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#96BF8A]/20 hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#96BF8A]" style={{ fontFamily: 'Hanken Grotesk' }}>
                        Total Nilai
                      </p>
                      <p className="text-3xl font-bold text-[#00412E] mt-1" style={{ fontFamily: 'Hanken Grotesk' }}>
                        Rp 2.4M
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <DollarSign className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm text-yellow-600">
                    <TrendingUp size={16} className="mr-1" />
                    <span>+15% dari bulan lalu</span>
                  </div>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#96BF8A]/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#00412E]" style={{ fontFamily: 'Hanken Grotesk' }}>
                    Aktivitas Terbaru
                  </h3>
                  <button className="text-[#96BF8A] hover:text-[#00412E] transition-colors duration-200 text-sm font-medium">
                    Lihat Semua
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-4 px-4 bg-[#E8EAE5] rounded-xl hover:bg-[#96BF8A]/10 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#96BF8A] rounded-full flex items-center justify-center">
                        <Plus className="text-[#00412E]" size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-[#00412E]" style={{ fontFamily: 'Hanken Grotesk' }}>
                          Ikan Gurame ditambahkan
                        </p>
                        <p className="text-sm text-[#96BF8A]">Kategori: Air Tawar</p>
                      </div>
                    </div>
                    <span className="text-xs text-[#96BF8A] bg-[#96BF8A]/10 px-3 py-1 rounded-full">
                      2 jam yang lalu
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between py-4 px-4 bg-[#E8EAE5] rounded-xl hover:bg-[#96BF8A]/10 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#96BF8A] rounded-full flex items-center justify-center">
                        <DollarSign className="text-[#00412E]" size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-[#00412E]" style={{ fontFamily: 'Hanken Grotesk' }}>
                          Harga Ikan Mas diupdate
                        </p>
                        <p className="text-sm text-[#96BF8A]">Rp 45.000 → Rp 52.000</p>
                      </div>
                    </div>
                    <span className="text-xs text-[#96BF8A] bg-[#96BF8A]/10 px-3 py-1 rounded-full">
                      5 jam yang lalu
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between py-4 px-4 bg-[#E8EAE5] rounded-xl hover:bg-[#96BF8A]/10 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="text-red-600" size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-[#00412E]" style={{ fontFamily: 'Hanken Grotesk' }}>
                          Ikan Lele dihapus
                        </p>
                        <p className="text-sm text-red-500">Stok habis permanen</p>
                      </div>
                    </div>
                    <span className="text-xs text-red-500 bg-red-100 px-3 py-1 rounded-full">
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
