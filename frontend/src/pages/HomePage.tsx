import React, { useState, useEffect } from 'react';

// Interface untuk data ikan
interface Ikan {
  id: number;
  nama: string;
  harga: number;
  satuanHarga: 'kg' | 'gram';
  stok: string;
  status: 'tersedia' | 'habis';
  deskripsi: string;
  gambar: string;
  created_at: string;
  updated_at: string;
}

// Interface untuk settings website
interface WebsiteSettings {
  websiteName: string;
  websiteDescription: string;
  contactInfo: string;
}

const HomePage: React.FC = () => {
  const [ikanList, setIkanList] = useState<Ikan[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings>({
    websiteName: 'Ikan Oni',
    websiteDescription: 'Toko Ikan Segar Terpercaya',
    contactInfo: 'Hubungi kami untuk pemesanan'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'tersedia' | 'habis'>('all');

  // Fetch data ikan
  const fetchIkan = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/ikan');
      
      if (!response.ok) {
        throw new Error('Gagal mengambil data ikan');
      }
      
      const data = await response.json();
      setIkanList(data.data || []);
    } catch (err) {
      console.error('Error fetching ikan:', err);
      setError('Gagal mengambil data ikan');
    } finally {
      setLoading(false);
    }
  };

  // Fetch settings website
  const fetchSettings = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/settings/website');
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setSettings({
            websiteName: data.data.websiteName || 'Ikan Oni',
            websiteDescription: data.data.websiteDescription || 'Toko Ikan Segar Terpercaya',
            contactInfo: data.data.contactInfo || 'Hubungi kami untuk pemesanan'
          });
        }
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  useEffect(() => {
    fetchIkan();
    fetchSettings();
  }, []);

  // Filter ikan berdasarkan search dan status
  const filteredIkan = ikanList.filter(ikan => {
    const matchesSearch = ikan.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ikan.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ikan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Format harga
  const formatHarga = (harga: number, satuan: string) => {
    return `Rp ${harga.toLocaleString('id-ID')}/${satuan}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data ikan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchIkan}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#00412E] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🐟</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Hanken Grotesk' }}>
                  {settings.websiteName}
                </h1>
                <p className="text-sm text-gray-600 hidden sm:block">
                  {settings.websiteDescription}
                </p>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-[#00412E] font-medium transition-colors">
                Beranda
              </a>
              <a href="#products" className="text-gray-700 hover:text-[#00412E] font-medium transition-colors">
                Produk
              </a>
              <a href="#about" className="text-gray-700 hover:text-[#00412E] font-medium transition-colors">
                Tentang
              </a>
              <a href="#contact" className="text-gray-700 hover:text-[#00412E] font-medium transition-colors">
                Kontak
              </a>
            </nav>
            
            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <button className="bg-[#00412E] text-white px-4 py-2 rounded-lg hover:bg-[#00412E]/90 transition-colors text-sm font-medium">
                Pesan Sekarang
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#00412E] via-[#00412E]/95 to-[#96BF8A] text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-white rounded-full"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-8 right-8 opacity-10">
          <span className="text-5xl">🐟</span>
        </div>
        <div className="absolute bottom-8 left-8 opacity-10">
          <span className="text-4xl">🌊</span>
        </div>
        <div className="absolute top-1/2 right-1/4 opacity-5">
          <span className="text-3xl">🐠</span>
        </div>
        
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                  <span className="text-2xl mr-2">🐟</span>
                  <span className="text-sm font-medium">Ikan Segar Berkualitas</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Hanken Grotesk' }}>
                  Ikan Segar
                  <span className="block text-[#96BF8A]">Berkualitas Tinggi</span>
                </h1>
                
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Temukan berbagai jenis ikan segar terbaik dengan harga terjangkau. 
                  Dapatkan kualitas premium dengan layanan terpercaya.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button className="bg-white text-[#00412E] px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                    🛒 Pesan Sekarang
                  </button>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#00412E] transition-all duration-200">
                    📞 Hubungi Kami
                  </button>
                </div>
              </div>
              
              {/* Right Content - Stats & Features */}
              <div className="space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-200">
                    <div className="text-3xl md:text-4xl font-bold text-[#96BF8A] mb-2">
                      {Array.isArray(filteredIkan) ? filteredIkan.length : 0}
                    </div>
                    <div className="text-sm text-white/80 font-medium">Jenis Ikan</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-200">
                    <div className="text-3xl md:text-4xl font-bold text-[#96BF8A] mb-2">
                      {Array.isArray(filteredIkan) ? filteredIkan.filter((i: Ikan) => i.status === 'tersedia').length : 0}
                    </div>
                    <div className="text-sm text-white/80 font-medium">Tersedia</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-200">
                    <div className="text-3xl md:text-4xl font-bold text-[#96BF8A] mb-2">100%</div>
                    <div className="text-sm text-white/80 font-medium">Segar</div>
                  </div>
                </div>
                
                {/* Features */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold mb-4 text-center lg:text-left">Mengapa Memilih Kami?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 bg-white/5 rounded-xl p-4">
                      <div className="w-10 h-10 bg-[#96BF8A] rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">✓</span>
                      </div>
                      <div>
                        <div className="font-semibold">Ikan Segar Berkualitas</div>
                        <div className="text-sm text-white/80">Dipilih langsung dari nelayan terpercaya</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/5 rounded-xl p-4">
                      <div className="w-10 h-10 bg-[#96BF8A] rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">🚚</span>
                      </div>
                      <div>
                        <div className="font-semibold">Pengiriman Cepat</div>
                        <div className="text-sm text-white/80">Sampai dalam 24 jam</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/5 rounded-xl p-4">
                      <div className="w-10 h-10 bg-[#96BF8A] rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">💯</span>
                      </div>
                      <div>
                        <div className="font-semibold">Garansi Kualitas</div>
                        <div className="text-sm text-white/80">100% puas atau uang kembali</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
              Temukan Ikan Segar Favorit Anda
            </h2>
            <p className="text-gray-600">Pilih dari berbagai jenis ikan segar berkualitas tinggi</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari ikan... (contoh: salmon, tuna, gurame)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00412E] focus:border-transparent transition-all duration-200"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'tersedia' | 'habis')}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00412E] focus:border-transparent transition-all duration-200 bg-white"
              >
                <option value="all">Semua Status</option>
                <option value="tersedia">Tersedia</option>
                <option value="habis">Habis</option>
              </select>
            </div>
          </div>
        </div>

        {/* Ikan Grid */}
        {filteredIkan.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-gray-400 text-8xl mb-6">🐟</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3" style={{ fontFamily: 'Hanken Grotesk' }}>
              {searchTerm || statusFilter !== 'all' ? 'Tidak ada ikan yang sesuai' : 'Belum ada ikan tersedia'}
            </h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              {searchTerm || statusFilter !== 'all' 
                ? 'Coba ubah kata kunci pencarian atau filter untuk menemukan ikan yang Anda cari' 
                : 'Kami sedang mempersiapkan stok ikan segar terbaik untuk Anda'
              }
            </p>
            {(searchTerm || statusFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="mt-6 bg-[#00412E] text-white px-6 py-3 rounded-xl hover:bg-[#00412E]/90 transition-colors font-medium"
              >
                Reset Filter
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredIkan.map((ikan) => (
              <div key={ikan.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#00412E]/30 overflow-hidden">
                {/* Card Header - Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  {ikan.gambar ? (
                    <img
                      src={`http://localhost:3001${ikan.gambar}`}
                      alt={ikan.nama}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNTBMMTUwIDEwMEgxMDBMMTAwIDUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNNTAgMTAwTDEwMCA1MEwxNTAgMTAwSDUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIxMDAiIHk9IjE0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0Ij7wn5SPPC90ZXh0Pgo8L3N2Zz4K';
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-6xl opacity-50">🐟</span>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                      ikan.status === 'tersedia' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {ikan.status === 'tersedia' ? '✅ Tersedia' : '❌ Habis'}
                    </span>
                  </div>
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col h-full">
                  {/* Header Section */}
                  <div className="mb-4">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00412E] transition-colors duration-200 line-clamp-1" style={{ fontFamily: 'Hanken Grotesk' }}>
                      {ikan.nama}
                    </h3>
                    
                    {/* Category Badge */}
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#00412E]/10 text-[#00412E] mb-3">
                      <span className="w-2 h-2 bg-[#00412E] rounded-full mr-2"></span>
                      Ikan Segar
                    </div>
                  </div>
                  
                  {/* Price Section */}
                  <div className="mb-4">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-3xl font-bold text-[#00412E]">
                          {formatHarga(ikan.harga, ikan.satuanHarga)}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">Harga per {ikan.satuanHarga}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-xs text-gray-500 mb-1">
                          <span className="mr-1">⭐</span>
                          <span className="font-semibold">4.8</span>
                        </div>
                        <div className="text-xs text-gray-400">Rating</div>
                      </div>
                    </div>
                  </div>

                  {/* Info Cards Section */}
                  <div className="mb-4 space-y-3">
                    {/* Stock Info */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl px-4 py-3 border border-green-100">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-green-600 text-sm">📦</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Stok Tersedia</div>
                          <div className="text-xs text-gray-600">Siap dikirim</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{ikan.stok}</div>
                        <div className="text-xs text-green-500">Unit</div>
                      </div>
                    </div>

                    {/* Quality Info */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl px-4 py-3 border border-blue-100">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 text-sm">✨</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Kualitas Premium</div>
                          <div className="text-xs text-gray-600">Segar & Berkualitas</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">A+</div>
                        <div className="text-xs text-blue-500">Grade</div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {ikan.deskripsi && (
                    <div className="mb-4 flex-1">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 mr-2">📝</span>
                          <span className="text-sm font-medium text-gray-700">Deskripsi</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                          {ikan.deskripsi}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Card Footer */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    {/* Date Info */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="mr-1">📅</span>
                        <span>Ditambahkan {new Date(ikan.created_at).toLocaleDateString('id-ID')}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="mr-1">🕒</span>
                        <span>Updated {new Date(ikan.updated_at).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <button
                      disabled={ikan.status !== 'tersedia'}
                      className={`w-full py-4 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center ${
                        ikan.status === 'tersedia'
                          ? 'bg-gradient-to-r from-[#00412E] to-[#96BF8A] text-white hover:from-[#00412E]/90 hover:to-[#96BF8A]/90 hover:scale-105 shadow-lg hover:shadow-xl'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {ikan.status === 'tersedia' ? (
                        <>
                          <span className="mr-2">🛒</span>
                          <span>Pesan Sekarang</span>
                        </>
                      ) : (
                        <>
                          <span className="mr-2">❌</span>
                          <span>Tidak Tersedia</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#00412E] to-[#96BF8A] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-2xl">🐟</span>
                </div>
                <h3 className="text-2xl font-bold" style={{ fontFamily: 'Hanken Grotesk' }}>
                  {settings.websiteName}
                </h3>
              </div>
              <p className="text-white/90 mb-4 text-lg">
                {settings.websiteDescription}
              </p>
              <p className="text-white/80 text-sm">
                {settings.contactInfo}
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Hanken Grotesk' }}>
                Layanan Kami
              </h4>
              <ul className="space-y-2 text-white/80">
                <li>🐟 Ikan Segar Berkualitas</li>
                <li>🚚 Pengiriman Cepat</li>
                <li>💯 Garansi Kualitas</li>
                <li>📞 Layanan 24/7</li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Hanken Grotesk' }}>
                Hubungi Kami
              </h4>
              <div className="space-y-3 text-white/80">
                <div className="flex items-center justify-center md:justify-start">
                  <span className="mr-2">📧</span>
                  <span>admin@ikanoni.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <span className="mr-2">📱</span>
                  <span>+62 812-3456-7890</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <span className="mr-2">📍</span>
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/70 text-sm mb-2 md:mb-0">
                © 2024 {settings.websiteName}. All rights reserved.
              </p>
              <div className="flex space-x-4 text-white/70 text-sm">
                <span>Privacy Policy</span>
                <span>•</span>
                <span>Terms of Service</span>
                <span>•</span>
                <span>FAQ</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
