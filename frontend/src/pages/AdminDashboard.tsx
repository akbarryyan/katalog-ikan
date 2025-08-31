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
  DollarSign,
  Clock
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
        <div className="bg-white shadow-lg border-b border-gray-100">
          <div className="flex items-center justify-between h-20 px-6 lg:px-8">
            {/* Left Section - Mobile Menu & Breadcrumb */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-3 rounded-xl text-[#00412E] hover:bg-[#E8EAE5] transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Menu size={24} />
              </button>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <span className="font-medium text-[#00412E]">Dashboard</span>
                <span>/</span>
                <span className="capitalize">{activeTab.replace('-', ' ')}</span>
              </div>
            </div>
            
            {/* Center Section - Search Bar */}
            <div className="flex-1 max-w-2xl mx-4 hidden md:block">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#96BF8A] group-focus-within:text-[#00412E] transition-colors duration-200" size={20} />
                <input
                  type="text"
                  placeholder="🔍 Cari ikan, kategori, atau harga..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#96BF8A] focus:border-[#96BF8A] transition-all duration-200 bg-gray-50 focus:bg-white placeholder:text-gray-400"
                  style={{ fontFamily: 'Hanken Grotesk' }}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <kbd className="hidden lg:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 rounded-md">
                    ⌘K
                  </kbd>
                </div>
              </div>
            </div>
            
            {/* Right Section - Actions & User */}
            <div className="flex items-center space-x-3">
              {/* Mobile Search Button */}
              <button className="md:hidden p-3 rounded-xl text-[#00412E] hover:bg-[#E8EAE5] transition-all duration-200 hover:scale-105 active:scale-95">
                <Search size={20} />
              </button>
              
              {/* Filter Button */}
              <button className="flex items-center px-4 py-3 text-sm font-medium text-[#00412E] bg-[#96BF8A]/10 hover:bg-[#96BF8A]/20 rounded-xl transition-all duration-200 border border-[#96BF8A]/20 hover:border-[#96BF8A]/30 hover:scale-105 active:scale-95 group">
                <Filter size={18} className="mr-2 group-hover:rotate-180 transition-transform duration-300" />
                <span className="hidden sm:inline">Filter</span>
              </button>
              
              {/* Notifications */}
              <button className="relative p-3 rounded-xl text-[#00412E] hover:bg-[#E8EAE5] transition-all duration-200 hover:scale-105 active:scale-95">
                <div className="relative">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M9 11h.01M9 8h.01" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
              </button>
              
              {/* Quick Actions Dropdown */}
              <div className="relative group">
                <button className="flex items-center px-4 py-3 text-sm font-medium text-[#00412E] bg-[#96BF8A]/10 hover:bg-[#96BF8A]/20 rounded-xl transition-all duration-200 border border-[#96BF8A]/20 hover:border-[#96BF8A]/30 hover:scale-105 active:scale-95">
                  <Plus size={18} className="mr-2" />
                  <span className="hidden sm:inline">Quick Add</span>
                  <svg className="w-4 h-4 ml-2 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100 z-50">
                  <div className="py-2">
                    <button 
                      onClick={() => onNavigate('tambah-ikan')}
                      className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-[#E8EAE5] hover:text-[#00412E] transition-colors duration-200"
                    >
                      <Fish size={16} className="mr-3" />
                      Tambah Ikan Baru
                    </button>
                    <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-[#E8EAE5] hover:text-[#00412E] transition-colors duration-200">
                      <Package size={16} className="mr-3" />
                      Update Stok
                    </button>
                    <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-[#E8EAE5] hover:text-[#00412E] transition-colors duration-200">
                      <DollarSign size={16} className="mr-3" />
                      Update Harga
                    </button>
                  </div>
                </div>
              </div>
              
              {/* User Profile */}
              <div className="hidden lg:flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Hanken Grotesk' }}>
                    {user?.email || 'Admin'}
                  </p>
                  <p className="text-xs text-[#96BF8A]" style={{ fontFamily: 'Hanken Grotesk' }}>
                    Online
                  </p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-[#00412E] to-[#96BF8A] rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200">
                  <Users className="text-white" size={20} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Search Bar (Hidden by default, shown when mobile search button clicked) */}
          <div className="md:hidden px-6 pb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#96BF8A]" size={20} />
              <input
                type="text"
                placeholder="🔍 Cari ikan, kategori, atau harga..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#96BF8A] focus:border-[#96BF8A] transition-all duration-200 bg-gray-50 focus:bg-white placeholder:text-gray-400"
                style={{ fontFamily: 'Hanken Grotesk' }}
              />
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#00412E] via-[#00412E]/95 to-[#96BF8A] rounded-3xl p-8 lg:p-12 text-white shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                  <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full opacity-50"></div>
                </div>
                
                {/* Floating Icons */}
                <div className="absolute top-6 right-8 opacity-20">
                  <Fish className="w-16 h-16 text-white animate-pulse" />
                </div>
                
                {/* Main Content */}
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      {/* Greeting with Time-based Message */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <span className="text-2xl">👋</span>
                        </div>
                        <div>
                          <h2 className="text-2xl lg:text-4xl font-bold mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                            Selamat {(() => {
                              const hour = new Date().getHours();
                              if (hour < 12) return 'Pagi';
                              if (hour < 15) return 'Siang';
                              if (hour < 18) return 'Sore';
                              return 'Malam';
                            })()}, Admin!
                          </h2>
                          <p className="text-[#E8EAE5] text-base lg:text-lg opacity-90" style={{ fontFamily: 'Hanken Grotesk' }}>
                            Kelola katalog ikan dan pantau performa penjualan Anda dengan mudah
                          </p>
                        </div>
                      </div>
                      
                      {/* Quick Stats - Jumlah Ikan */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-200 group cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-[#E8EAE5] opacity-80">Total Ikan</p>
                            <Fish className="w-4 h-4 text-[#96BF8A] group-hover:scale-110 transition-transform duration-200" />
                          </div>
                          <p className="text-xl font-bold">24</p>
                          <p className="text-xs text-[#96BF8A] mt-1">+2 dari kemarin</p>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-200 group cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-[#E8EAE5] opacity-80">Tersedia</p>
                            <Package className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform duration-200" />
                          </div>
                          <p className="text-xl font-bold">18</p>
                          <p className="text-xs text-green-400 mt-1">75% stok</p>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-200 group cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-[#E8EAE5] opacity-80">Habis Stok</p>
                            <AlertCircle className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform duration-200" />
                          </div>
                          <p className="text-xl font-bold">6</p>
                          <p className="text-xs text-red-400 mt-1">Perlu restock</p>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-200 group cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-[#E8EAE5] opacity-80">Kategori</p>
                            <BarChart3 className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform duration-200" />
                          </div>
                          <p className="text-xl font-bold">8</p>
                          <p className="text-xs text-yellow-400 mt-1">Air Tawar & Laut</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Side - Action Buttons */}
                    <div className="mt-6 lg:mt-0 lg:ml-8">
                      <div className="flex flex-col space-y-3">
                        <button 
                          onClick={() => onNavigate('tambah-ikan')}
                          className="flex items-center justify-center px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl border border-white/30 hover:border-white/50 transition-all duration-200 hover:scale-105 active:scale-95 group"
                        >
                          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                          <span className="font-medium">Tambah Ikan</span>
                        </button>
                        
                        <button 
                          onClick={() => onNavigate('kelola-ikan')}
                          className="flex items-center justify-center px-6 py-3 bg-[#96BF8A]/20 hover:bg-[#96BF8A]/30 backdrop-blur-sm rounded-xl border border-[#96BF8A]/30 hover:border-[#96BF8A]/50 transition-all duration-200 hover:scale-105 active:scale-95 group"
                        >
                          <Fish className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-medium">Kelola Katalog</span>
                        </button>
                        
                        <button className="flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 hover:border-white/40 transition-all duration-200 hover:scale-105 active:scale-95 group">
                          <BarChart3 className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                          <span className="font-medium">Lihat Laporan</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Info */}
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-center space-x-4 text-sm text-[#E8EAE5] opacity-80">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span>Sistem Online</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{new Date().toLocaleDateString('id-ID', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 lg:mt-0">
                        <button className="text-sm text-[#96BF8A] hover:text-white transition-colors duration-200 underline decoration-dotted underline-offset-4">
                          Lihat Tutorial Dashboard →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
