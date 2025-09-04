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

  // Navigate to admin
  const goToAdmin = () => {
    window.location.href = '/sys';
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
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{settings.websiteName}</h1>
              <p className="text-sm text-gray-600">{settings.websiteDescription}</p>
            </div>
            <button
              onClick={goToAdmin}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Admin Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cari ikan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'tersedia' | 'habis')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🐟</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchTerm || statusFilter !== 'all' ? 'Tidak ada ikan yang sesuai' : 'Belum ada ikan tersedia'}
            </h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Coba ubah kata kunci pencarian atau filter' 
                : 'Silakan hubungi admin untuk menambah stok ikan'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredIkan.map((ikan) => (
              <div key={ikan.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                  {ikan.gambar ? (
                    <img
                      src={`http://localhost:3001${ikan.gambar}`}
                      alt={ikan.nama}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNTBMMTUwIDEwMEgxMDBMMTAwIDUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNNTAgMTAwTDEwMCA1MEwxNTAgMTAwSDUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIxMDAiIHk9IjE0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0Ij7wn5SPPC90ZXh0Pgo8L3N2Zz4K';
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-4xl">🐟</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{ikan.nama}</h3>
                  
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-blue-600">
                      {formatHarga(ikan.harga, ikan.satuanHarga)}
                    </span>
                  </div>

                  <div className="mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      ikan.status === 'tersedia' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {ikan.status === 'tersedia' ? '✅ Tersedia' : '❌ Habis'}
                    </span>
                    <span className="ml-2 text-sm text-gray-600">
                      Stok: {ikan.stok}
                    </span>
                  </div>

                  {ikan.deskripsi && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {ikan.deskripsi}
                    </p>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {new Date(ikan.created_at).toLocaleDateString('id-ID')}
                    </span>
                    <button
                      disabled={ikan.status !== 'tersedia'}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        ikan.status === 'tersedia'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {ikan.status === 'tersedia' ? 'Pesan' : 'Tidak Tersedia'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{settings.websiteName}</h3>
            <p className="text-gray-300 mb-4">{settings.websiteDescription}</p>
            <p className="text-sm text-gray-400">{settings.contactInfo}</p>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                © 2024 {settings.websiteName}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
