import { useState } from 'react';
import { 
  Fish, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  ChevronDown,
  ChevronUp,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  Clock,
  Package,
  DollarSign,
  Tag,
  Grid3X3,
  List,
  BarChart3
} from 'lucide-react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import FormTambahIkan from '../components/FormTambahIkan';

interface Ikan {
  id: number;
  nama: string;
  kategori: string;
  ukuran: string;
  harga: number;
  stok: number;
  status: 'tersedia' | 'habis' | 'pre-order';
  deskripsi: string;
  gambar: string;
  created_at: string;
  updated_at: string;
}

interface ManageIkanProps {
  onLogout?: () => void;
  user?: { email: string } | null;
  onNavigate?: (route: 'dashboard' | 'tambah-ikan' | 'kelola-ikan') => void;
}

const ManageIkan = ({ onLogout, user, onNavigate }: ManageIkanProps) => {
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('nama');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  // Mock data ikan
  const mockIkan: Ikan[] = [
    {
      id: 1,
      nama: 'Ikan Gurame',
      kategori: 'Air Tawar',
      ukuran: 'Sedang',
      harga: 85000,
      stok: 15,
      status: 'tersedia',
      deskripsi: 'Ikan gurame segar dari kolam lokal, daging tebal dan lezat',
      gambar: '/api/images/gurame.jpg',
      created_at: '2024-01-15',
      updated_at: '2024-01-20'
    },
    {
      id: 2,
      nama: 'Ikan Mas',
      kategori: 'Air Tawar',
      ukuran: 'Kecil',
      harga: 52000,
      stok: 0,
      status: 'habis',
      deskripsi: 'Ikan mas merah segar, cocok untuk masakan tradisional',
      gambar: '/api/images/mas.jpg',
      created_at: '2024-01-10',
      updated_at: '2024-01-18'
    },
    {
      id: 3,
      nama: 'Ikan Kakap',
      kategori: 'Air Laut',
      ukuran: 'Besar',
      harga: 120000,
      stok: 8,
      status: 'tersedia',
      deskripsi: 'Ikan kakap merah segar dari laut, daging putih dan lembut',
      gambar: '/api/images/kakap.jpg',
      created_at: '2024-01-12',
      updated_at: '2024-01-19'
    },
    {
      id: 4,
      nama: 'Ikan Lele',
      kategori: 'Air Tawar',
      ukuran: 'Sedang',
      harga: 45000,
      stok: 5,
      status: 'pre-order',
      deskripsi: 'Ikan lele segar, cocok untuk berbagai masakan',
      gambar: '/api/images/lele.jpg',
      created_at: '2024-01-08',
      updated_at: '2024-01-16'
    }
  ];

  const categories = ['all', 'Air Tawar', 'Air Laut'];
  const statuses = ['all', 'tersedia', 'habis', 'pre-order'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'tersedia': return 'text-green-600 bg-green-100';
      case 'habis': return 'text-red-600 bg-red-100';
      case 'pre-order': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'tersedia': return <CheckCircle className="w-4 h-4" />;
      case 'habis': return <AlertCircle className="w-4 h-4" />;
      case 'pre-order': return <Clock className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleEdit = (ikan: Ikan) => {
    console.log('Edit ikan:', ikan);
    // TODO: Implement edit functionality
  };

  const handleDelete = (ikan: Ikan) => {
    if (confirm(`Apakah Anda yakin ingin menghapus ${ikan.nama}?`)) {
      console.log('Delete ikan:', ikan);
      // TODO: Implement delete functionality
    }
  };

  const handleView = (ikan: Ikan) => {
    console.log('View ikan:', ikan);
    // TODO: Implement view functionality
  };

  // Modal handlers
  const handleOpenModal = () => {
    setIsButtonLoading(true);
    
    // Simulate button loading for 1.5 seconds
    setTimeout(() => {
      setIsButtonLoading(false);
      setIsModalOpen(true);
      // Modal langsung tampil form tanpa loading
      setIsModalLoading(false);
    }, 1500);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalLoading(false);
  };

  const handleSaveIkan = (data: any) => {
    console.log('Data ikan baru:', data);
    // TODO: Implement save logic
    handleCloseModal();
  };

  return (
    <Layout 
      onLogout={onLogout || (() => {})}
      user={user || null}
      onNavigate={onNavigate || (() => {})}
      currentRoute="kelola-ikan"
    >
      <div className="bg-[#E8EAE5] p-6">
      {/* Enhanced Header Section */}
      <div className="relative mb-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#E8EAE5]/30 to-[#96BF8A]/10 rounded-3xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#96BF8A]/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#00412E]/5 rounded-full translate-y-12 -translate-x-12"></div>
        
        {/* Floating Fish Icon */}
        <div className="absolute top-6 right-8 opacity-10">
          <Fish className="w-20 h-20 text-[#00412E] animate-pulse" />
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/50 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left Section - Title & Description */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                {/* Icon Container */}
                <div className="flex-shrink-0 p-4 bg-gradient-to-br from-[#00412E] to-[#96BF8A] rounded-2xl shadow-lg">
                  <Fish className="w-8 h-8 text-white" />
                </div>
                
                {/* Title & Subtitle */}
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00412E] leading-tight" style={{ fontFamily: 'Hanken Grotesk' }}>
                    Kelola Katalog Ikan
                  </h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-[#96BF8A] rounded-full animate-pulse"></div>
                    <p className="text-gray-600 text-base lg:text-lg font-medium" style={{ fontFamily: 'Hanken Grotesk' }}>
                      Kelola semua data ikan dalam satu tempat yang mudah
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Quick Info Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#00412E]/10 text-[#00412E] border border-[#00412E]/20">
                  <Package className="w-3 h-3 mr-1" />
                  {mockIkan.length} Total Ikan
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {mockIkan.filter(i => i.status === 'tersedia').length} Tersedia
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {mockIkan.filter(i => i.status === 'habis').length} Habis Stok
                </span>
              </div>
            </div>
            
            {/* Right Section - Action Buttons */}
            <div className="flex-shrink-0">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Primary Action Button */}
                <button 
                  onClick={handleOpenModal}
                  disabled={isButtonLoading}
                  className="group inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-[#00412E] to-[#96BF8A] text-white font-semibold rounded-xl hover:from-[#96BF8A] hover:to-[#00412E] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:-translate-y-0"
                >
                  {isButtonLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span className="whitespace-nowrap">Memuat...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                      <span className="whitespace-nowrap">Tambah Ikan Baru</span>
                      <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                  )}
                </button>
                
                {/* Secondary Action Buttons */}
                <div className="flex gap-2">
                  <button className="group inline-flex items-center justify-center px-4 py-3.5 bg-white text-[#00412E] font-medium rounded-xl hover:bg-[#96BF8A]/10 transition-all duration-300 hover:scale-105 active:scale-95 border border-[#96BF8A]/20 hover:border-[#96BF8A]/40 shadow-lg hover:shadow-xl">
                    <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="hidden sm:inline whitespace-nowrap">Import</span>
                  </button>
                  
                  <button className="group inline-flex items-center justify-center px-4 py-3.5 bg-white text-[#00412E] font-medium rounded-xl hover:bg-[#96BF8A]/10 transition-all duration-300 hover:scale-105 active:scale-95 border border-[#96BF8A]/20 hover:border-[#96BF8A]/40 shadow-lg hover:shadow-xl">
                    <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="hidden sm:inline whitespace-nowrap">Export</span>
                  </button>
                </div>
              </div>
              
              {/* Quick Stats Summary */}
              <div className="mt-4 p-3 bg-gradient-to-r from-[#00412E]/5 to-[#96BF8A]/5 rounded-xl border border-[#96BF8A]/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-medium">Total Nilai Stok:</span>
                  <span className="text-[#00412E] font-bold">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(mockIkan.reduce((sum, i) => sum + (i.harga * i.stok), 0))}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Action Bar - Mobile Friendly */}
          <div className="mt-6 pt-6 border-t border-gray-200/50 lg:hidden">
            <div className="flex flex-wrap gap-2 justify-center">
              <button className="flex-1 min-w-0 inline-flex items-center justify-center px-4 py-2 bg-[#00412E]/10 text-[#00412E] text-sm font-medium rounded-lg hover:bg-[#00412E]/20 transition-all duration-200">
                <Search className="w-4 h-4 mr-2" />
                Cari Ikan
              </button>
              <button className="flex-1 min-w-0 inline-flex items-center justify-center px-4 py-2 bg-[#96BF8A]/10 text-[#00412E] text-sm font-medium rounded-lg hover:bg-[#96BF8A]/20 transition-all duration-200">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Hanken Grotesk' }}>
                Total Ikan
              </p>
              <p className="text-3xl font-bold text-[#00412E] mt-1" style={{ fontFamily: 'Hanken Grotesk' }}>
                {mockIkan.length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-[#00412E] to-[#96BF8A] rounded-xl">
              <Fish className="text-white" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Hanken Grotesk' }}>
                Tersedia
              </p>
              <p className="text-3xl font-bold text-green-600 mt-1" style={{ fontFamily: 'Hanken Grotesk' }}>
                {mockIkan.filter(i => i.status === 'tersedia').length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
              <CheckCircle className="text-white" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Hanken Grotesk' }}>
                Habis Stok
              </p>
              <p className="text-3xl font-bold text-red-600 mt-1" style={{ fontFamily: 'Hanken Grotesk' }}>
                {mockIkan.filter(i => i.status === 'habis').length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
              <AlertCircle className="text-white" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Hanken Grotesk' }}>
                Total Nilai
              </p>
              <p className="text-3xl font-bold text-[#00412E] mt-1" style={{ fontFamily: 'Hanken Grotesk' }}>
                Rp {(mockIkan.reduce((sum, i) => sum + (i.harga * i.stok), 0) / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl">
              <DollarSign className="text-white" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Search & Filter Section */}
      <div className="relative mb-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-[#96BF8A]/5 to-[#00412E]/5 rounded-3xl"></div>
        <div className="absolute top-0 left-0 w-20 h-20 bg-[#96BF8A]/10 rounded-full -translate-y-10 -translate-x-10"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#00412E]/10 rounded-full translate-y-8 translate-x-8"></div>
        
        {/* Main Container */}
        <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/50 shadow-xl">
          {/* Top Section - Search & Quick Actions */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Enhanced Search Bar */}
            <div className="flex-1">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#96BF8A]/20 to-[#00412E]/20 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#96BF8A] group-focus-within:text-[#00412E] transition-colors duration-200" size={20} />
                  <input
                    type="text"
                    placeholder="🔍 Cari nama ikan, kategori, atau deskripsi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/80 border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-300 placeholder:text-gray-500 text-gray-800 shadow-sm hover:shadow-md"
                    style={{ fontFamily: 'Hanken Grotesk' }}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <kbd className="hidden lg:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 bg-white/80 rounded-md border border-gray-200">
                      ⌘K
                    </kbd>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap gap-3">
              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`group inline-flex items-center px-4 py-4 text-sm font-semibold rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ${
                  showFilters 
                    ? 'bg-gradient-to-r from-[#00412E] to-[#96BF8A] text-white shadow-[#96BF8A]/25' 
                    : 'bg-white text-[#00412E] border border-[#96BF8A]/20 hover:border-[#96BF8A]/40 hover:bg-[#96BF8A]/5'
                }`}
              >
                <Filter size={18} className={`mr-2 transition-transform duration-300 ${showFilters ? 'rotate-180' : 'group-hover:rotate-12'}`} />
                <span className="hidden sm:inline">Filter</span>
                {showFilters ? <ChevronUp size={18} className="ml-2 animate-bounce" /> : <ChevronDown size={18} className="ml-2" />}
              </button>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100/80 backdrop-blur-sm rounded-2xl p-1.5 border border-gray-200/50 shadow-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-[#00412E] shadow-lg scale-105 border border-[#96BF8A]/20' 
                      : 'text-gray-500 hover:text-[#00412E] hover:bg-white/50'
                  }`}
                  title="Grid View"
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white text-[#00412E] shadow-lg scale-105 border border-[#96BF8A]/20' 
                      : 'text-gray-500 hover:text-[#00412E] hover:bg-white/50'
                  }`}
                  title="List View"
                >
                  <List size={18} />
                </button>
              </div>

              {/* Export Button */}
              <button className="group inline-flex items-center px-4 py-4 text-sm font-semibold text-[#00412E] bg-white hover:bg-[#96BF8A]/5 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-200/50 hover:border-[#96BF8A]/30 shadow-lg hover:shadow-xl">
                <Download className="w-4 h-4 mr-2 group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 font-medium" style={{ fontFamily: 'Hanken Grotesk' }}>
                Menampilkan <span className="font-bold text-[#00412E]">{mockIkan.length}</span> ikan
              </span>
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#96BF8A]/10 text-[#00412E] border border-[#96BF8A]/20">
                  <Search className="w-3 h-3 mr-1" />
                  "{searchTerm}"
                </span>
              )}
            </div>
            
            {/* Quick Filter Badges */}
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                  <Tag className="w-3 h-3 mr-1" />
                  {selectedCategory}
                  <button 
                    onClick={() => setSelectedCategory('all')}
                    className="ml-2 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedStatus !== 'all' && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  selectedStatus === 'tersedia' ? 'bg-green-100 text-green-700 border-green-200' :
                  selectedStatus === 'habis' ? 'bg-red-100 text-red-700 border-red-200' :
                  'bg-yellow-100 text-yellow-700 border-yellow-200'
                } border`}>
                  {getStatusIcon(selectedStatus)}
                  <span className="ml-1 capitalize">{selectedStatus}</span>
                  <button 
                    onClick={() => setSelectedStatus('all')}
                    className="ml-2 hover:bg-opacity-20 hover:bg-gray-500 rounded-full p-0.5 transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="border-t border-gray-200/50 pt-6 animate-in slide-in-from-top-2 duration-300">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#00412E] mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                  🔧 Filter Lanjutan
                </h3>
                <p className="text-sm text-gray-600">Gunakan filter di bawah untuk mencari ikan yang lebih spesifik</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: 'Hanken Grotesk' }}>
                    <Tag className="w-4 h-4 mr-2 text-[#96BF8A]" />
                    Kategori Ikan
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                      style={{ fontFamily: 'Hanken Grotesk' }}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? '🐟 Semua Kategori' : `🌊 ${category}`}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: 'Hanken Grotesk' }}>
                    <Package className="w-4 h-4 mr-2 text-[#96BF8A]" />
                    Status Ketersediaan
                  </label>
                  <div className="relative">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                      style={{ fontFamily: 'Hanken Grotesk' }}
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>
                          {status === 'all' ? '📋 Semua Status' : 
                           status === 'tersedia' ? '✅ Tersedia' :
                           status === 'habis' ? '❌ Habis Stok' : 
                           '⏳ Pre-Order'}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
                </div>

                {/* Sort Filter */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: 'Hanken Grotesk' }}>
                    <BarChart3 className="w-4 h-4 mr-2 text-[#96BF8A]" />
                    Urutkan Berdasarkan
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-l-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                        style={{ fontFamily: 'Hanken Grotesk' }}
                      >
                        <option value="nama">📝 Nama</option>
                        <option value="harga">💰 Harga</option>
                        <option value="stok">📦 Stok</option>
                        <option value="created_at">📅 Tanggal</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className={`px-4 py-3 border border-l-0 border-gray-200/50 rounded-r-xl hover:bg-gray-50 transition-all duration-200 ${
                        sortOrder === 'asc' ? 'bg-[#96BF8A]/10 text-[#00412E]' : 'bg-gray-50 text-gray-600'
                      }`}
                      title={sortOrder === 'asc' ? 'Urutan Naik (A-Z, 1-9)' : 'Urutan Turun (Z-A, 9-1)'}
                    >
                      {sortOrder === 'asc' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Filter Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-200/50">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Filter aktif:</span>
                  <span className="font-semibold text-[#00412E]">
                    {[selectedCategory !== 'all' ? 1 : 0, selectedStatus !== 'all' ? 1 : 0].reduce((a, b) => a + b, 0)} dari 2
                  </span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedStatus('all');
                      setSortBy('nama');
                      setSortOrder('asc');
                      setSearchTerm('');
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                  >
                    Reset Semua
                  </button>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#00412E] to-[#96BF8A] hover:from-[#96BF8A] hover:to-[#00412E] rounded-lg transition-all duration-200"
                  >
                    Terapkan Filter
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      {viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockIkan.map((ikan) => (
            <div key={ikan.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-[#00412E] to-[#96BF8A] flex items-center justify-center">
                <Fish className="w-16 h-16 text-white opacity-80" />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#00412E] transition-colors duration-200" style={{ fontFamily: 'Hanken Grotesk' }}>
                    {ikan.nama}
                  </h3>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleView(ikan)}
                      className="p-2 text-gray-400 hover:text-[#00412E] hover:bg-[#96BF8A]/10 rounded-lg transition-all duration-200"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleEdit(ikan)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(ikan)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Tag className="w-4 h-4 mr-2" />
                    {ikan.kategori}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Package className="w-4 h-4 mr-2" />
                    {ikan.ukuran}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {formatPrice(ikan.harga)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ikan.status)}`}>
                    {getStatusIcon(ikan.status)}
                    <span className="ml-1 capitalize">{ikan.status}</span>
                  </span>
                  <span className="text-sm text-gray-500">
                    Stok: {ikan.stok}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Hanken Grotesk' }}>
                    Ikan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Hanken Grotesk' }}>
                    Kategori
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Hanken Grotesk' }}>
                    Harga
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Hanken Grotesk' }}>
                    Stok
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Hanken Grotesk' }}>
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Hanken Grotesk' }}>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockIkan.map((ikan) => (
                  <tr key={ikan.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#00412E] to-[#96BF8A] rounded-lg flex items-center justify-center mr-3">
                          <Fish className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Hanken Grotesk' }}>
                            {ikan.nama}
                          </div>
                          <div className="text-sm text-gray-500">{ikan.ukuran}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {ikan.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPrice(ikan.harga)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ikan.stok}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ikan.status)}`}>
                        {getStatusIcon(ikan.status)}
                        <span className="ml-1 capitalize">{ikan.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleView(ikan)}
                          className="text-[#00412E] hover:text-[#96BF8A] transition-colors duration-200"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(ikan)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(ikan)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {mockIkan.length === 0 && (
        <div className="text-center py-12">
          <Fish className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
            Belum ada data ikan
          </h3>
          <p className="text-gray-500 mb-6">Mulai dengan menambahkan ikan pertama ke katalog</p>
          <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00412E] to-[#96BF8A] text-white font-medium rounded-xl hover:from-[#96BF8A] hover:to-[#00412E] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg">
            <Plus className="w-5 h-5 mr-2" />
            Tambah Ikan Pertama
          </button>
        </div>
      )}

      {/* Modal Tambah Ikan */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="🐟 Tambah Ikan Baru"
        size="lg"
        showLoading={isModalLoading}
        loadingMessage="Memuat form tambah ikan..."
      >
        <FormTambahIkan
          onSave={handleSaveIkan}
          onCancel={handleCloseModal}
        />
      </Modal>
      </div>
    </Layout>
  );
};

export default ManageIkan;
