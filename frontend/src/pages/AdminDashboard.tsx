import { useState } from 'react';
import { 
  Fish, 
  Plus, 
  TrendingUp,
  Package,
  AlertCircle,
  BarChart3,
  Users,
  DollarSign,
  Clock
} from 'lucide-react';
import Layout from '../components/Layout';

interface AdminDashboardProps {
  onLogout: () => void;
  user: { email: string } | null;
  onNavigate: (route: 'dashboard' | 'tambah-ikan' | 'kelola-ikan') => void;
}

const AdminDashboard = ({ onLogout, user, onNavigate }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Layout 
      onLogout={onLogout}
      user={user}
      onNavigate={onNavigate}
      currentRoute="dashboard"
    >
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
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#00412E] to-[#96BF8A] px-8 py-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ fontFamily: 'Hanken Grotesk' }}>
                      Aktivitas Terbaru
                    </h3>
                    <p className="text-sm text-white/80">Pantau semua aktivitas terbaru</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 text-sm font-medium">
                    Filter
                  </button>
                  <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 text-sm font-medium">
                    Lihat Semua
                  </button>
                </div>
              </div>
            </div>
            
            {/* Activity List */}
            <div className="p-6 lg:p-8">
              <div className="space-y-4">
                {/* Activity Item 1 - Added */}
                <div className="group relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#96BF8A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 hover:shadow-lg border border-green-100 hover:border-green-200 cursor-pointer group">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Plus className="text-white" size={20} />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-white font-bold">+</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-[#00412E] transition-colors duration-200" style={{ fontFamily: 'Hanken Grotesk' }}>
                            Ikan Gurame ditambahkan
                          </p>
                          <div className="flex items-center space-x-3 mt-1 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>Kategori: Air Tawar</span>
                            </span>
                            <span>•</span>
                            <span>Stok: 15 kg</span>
                            <span>•</span>
                            <span>Harga: Rp 85.000/kg</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className="text-xs text-green-600 bg-green-100 px-3 py-1 rounded-full font-medium">
                            2 jam yang lalu
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Activity Item 2 - Updated */}
                <div className="group relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 hover:shadow-lg border border-blue-100 hover:border-blue-200 cursor-pointer group">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <DollarSign className="text-white" size={20} />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-white font-bold">$</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-[#00412E] transition-colors duration-200" style={{ fontFamily: 'Hanken Grotesk' }}>
                            Harga Ikan Mas diupdate
                          </p>
                          <div className="flex items-center space-x-3 mt-1 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span>Perubahan Harga</span>
                            </span>
                            <span>•</span>
                            <span className="line-through text-red-500">Rp 45.000</span>
                            <span>→</span>
                            <span className="text-green-600 font-semibold">Rp 52.000</span>
                            <span>•</span>
                            <span className="text-green-600">+15.6%</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-medium">
                            5 jam yang lalu
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Activity Item 3 - Deleted */}
                <div className="group relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl hover:from-red-100 hover:to-pink-100 transition-all duration-300 hover:shadow-lg border border-red-100 hover:border-red-200 cursor-pointer group">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <AlertCircle className="text-white" size={20} />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-white font-bold">!</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-[#00412E] transition-colors duration-200" style={{ fontFamily: 'Hanken Grotesk' }}>
                            Ikan Lele dihapus
                          </p>
                          <div className="flex items-center space-x-3 mt-1 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span>Stok habis permanen</span>
                            </span>
                            <span>•</span>
                            <span>Kategori: Air Tawar</span>
                            <span>•</span>
                            <span className="text-red-600 font-medium">Tindakan: Hapus dari katalog</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className="text-xs text-red-600 bg-red-100 px-3 py-1 rounded-full font-medium">
                            1 hari yang lalu
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Load More Button */}
              <div className="mt-8 text-center">
                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00412E] to-[#96BF8A] text-white font-medium rounded-xl hover:from-[#96BF8A] hover:to-[#00412E] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Muat Lebih Banyak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminDashboard;
