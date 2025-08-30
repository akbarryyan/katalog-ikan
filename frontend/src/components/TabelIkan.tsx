import { useState } from 'react';
import { Edit, Trash2, Eye, Search, Filter, Plus } from 'lucide-react';

interface Ikan {
  id: string;
  nama: string;
  harga: number;
  stok: 'tersedia' | 'tidak_tersedia';
  kategori: 'air_tawar' | 'laut';
  ukuran: 'kecil' | 'sedang' | 'besar';
  deskripsi: string;
  gambar: string;
  createdAt: string;
}

interface TabelIkanProps {
  onEdit: (ikan: Ikan) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const TabelIkan = ({ onEdit, onDelete, onAdd }: TabelIkanProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKategori, setFilterKategori] = useState<string>('semua');
  const [filterStok, setFilterStok] = useState<string>('semua');
  const [sortBy, setSortBy] = useState<string>('nama');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Mock data untuk demo
  const mockData: Ikan[] = [
    {
      id: '1',
      nama: 'Ikan Gurame',
      harga: 45000,
      stok: 'tersedia',
      kategori: 'air_tawar',
      ukuran: 'besar',
      deskripsi: 'Ikan gurame segar ukuran besar, cocok untuk konsumsi keluarga',
      gambar: '/placeholder-fish.jpg',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      nama: 'Ikan Mas',
      harga: 35000,
      stok: 'tersedia',
      kategori: 'air_tawar',
      ukuran: 'sedang',
      deskripsi: 'Ikan mas segar ukuran sedang, daging lembut dan gurih',
      gambar: '/placeholder-fish.jpg',
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      nama: 'Ikan Lele',
      harga: 25000,
      stok: 'tidak_tersedia',
      kategori: 'air_tawar',
      ukuran: 'kecil',
      deskripsi: 'Ikan lele segar ukuran kecil, cocok untuk masakan pedas',
      gambar: '/placeholder-fish.jpg',
      createdAt: '2024-01-13'
    },
    {
      id: '4',
      nama: 'Ikan Kakap',
      harga: 85000,
      stok: 'tersedia',
      kategori: 'laut',
      ukuran: 'besar',
      deskripsi: 'Ikan kakap merah segar dari laut, daging putih dan tebal',
      gambar: '/placeholder-fish.jpg',
      createdAt: '2024-01-12'
    },
    {
      id: '5',
      nama: 'Ikan Tenggiri',
      harga: 65000,
      stok: 'tersedia',
      kategori: 'laut',
      ukuran: 'sedang',
      deskripsi: 'Ikan tenggiri segar, cocok untuk ikan bakar atau gulai',
      gambar: '/placeholder-fish.jpg',
      createdAt: '2024-01-11'
    }
  ];

  // Filter dan search data
  const filteredData = mockData.filter(ikan => {
    const matchesSearch = ikan.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ikan.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKategori = filterKategori === 'semua' || ikan.kategori === filterKategori;
    const matchesStok = filterStok === 'semua' || ikan.stok === filterStok;
    
    return matchesSearch && matchesKategori && matchesStok;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    let aValue: any = a[sortBy as keyof Ikan];
    let bValue: any = b[sortBy as keyof Ikan];
    
    if (sortBy === 'harga') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusBadge = (stok: string) => {
    if (stok === 'tersedia') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Tersedia
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Habis Stok
        </span>
      );
    }
  };

  const getKategoriBadge = (kategori: string) => {
    if (kategori === 'air_tawar') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Air Tawar
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          Laut
        </span>
      );
    }
  };

  const getUkuranBadge = (ukuran: string) => {
    const sizeMap = {
      kecil: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Kecil' },
      sedang: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Sedang' },
      besar: { bg: 'bg-red-100', text: 'text-red-800', label: 'Besar' }
    };
    
    const size = sizeMap[ukuran as keyof typeof sizeMap];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${size.bg} ${size.text}`}>
        {size.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header dengan Search, Filter, dan Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Hanken Grotesk' }}>
            Kelola Ikan
          </h2>
          <p className="text-gray-600 mt-1" style={{ fontFamily: 'Hanken Grotesk' }}>
            Kelola daftar ikan dalam katalog
          </p>
        </div>
        
        <button
          onClick={onAdd}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium"
          style={{ fontFamily: 'Hanken Grotesk' }}
        >
          <Plus size={20} className="mr-2" />
          Tambah Ikan
        </button>
      </div>

      {/* Search dan Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari ikan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ fontFamily: 'Hanken Grotesk' }}
            />
          </div>

          {/* Filter Kategori */}
          <div>
            <select
              value={filterKategori}
              onChange={(e) => setFilterKategori(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ fontFamily: 'Hanken Grotesk' }}
            >
              <option value="semua">Semua Kategori</option>
              <option value="air_tawar">Air Tawar</option>
              <option value="laut">Laut</option>
            </select>
          </div>

          {/* Filter Stok */}
          <div>
            <select
              value={filterStok}
              onChange={(e) => setFilterStok(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ fontFamily: 'Hanken Grotesk' }}
            >
              <option value="semua">Semua Stok</option>
              <option value="tersedia">Tersedia</option>
              <option value="tidak_tersedia">Habis Stok</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ fontFamily: 'Hanken Grotesk' }}
            >
              <option value="nama-asc">Nama A-Z</option>
              <option value="nama-desc">Nama Z-A</option>
              <option value="harga-asc">Harga Terendah</option>
              <option value="harga-desc">Harga Tertinggi</option>
              <option value="createdAt-desc">Terbaru</option>
              <option value="createdAt-asc">Terlama</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ikan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stok
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ukuran
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((ikan) => (
                <tr key={ikan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={ikan.gambar}
                          alt={ikan.nama}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Hanken Grotesk' }}>
                          {ikan.nama}
                        </div>
                        <div className="text-sm text-gray-500 max-w-xs truncate" style={{ fontFamily: 'Hanken Grotesk' }}>
                          {ikan.deskripsi}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Hanken Grotesk' }}>
                      {formatPrice(ikan.harga)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(ikan.stok)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getKategoriBadge(ikan.kategori)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getUkuranBadge(ikan.ukuran)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" style={{ fontFamily: 'Hanken Grotesk' }}>
                    {new Date(ikan.createdAt).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onEdit(ikan)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors duration-200"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(ikan.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors duration-200"
                        title="Hapus"
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

        {/* Empty state */}
        {sortedData.length === 0 && (
          <div className="text-center py-12">
            <Fish className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900" style={{ fontFamily: 'Hanken Grotesk' }}>
              Tidak ada ikan ditemukan
            </h3>
            <p className="mt-1 text-sm text-gray-500" style={{ fontFamily: 'Hanken Grotesk' }}>
              Coba ubah filter atau kata kunci pencarian Anda.
            </p>
          </div>
        )}
      </div>

      {/* Pagination info */}
      <div className="text-center text-sm text-gray-500" style={{ fontFamily: 'Hanken Grotesk' }}>
        Menampilkan {sortedData.length} dari {mockData.length} ikan
      </div>
    </div>
  );
};

export default TabelIkan;
