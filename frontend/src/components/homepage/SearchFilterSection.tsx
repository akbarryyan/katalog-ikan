import React from 'react';

interface SearchFilterSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: 'all' | 'tersedia' | 'habis';
  setStatusFilter: (status: 'all' | 'tersedia' | 'habis') => void;
}

const SearchFilterSection: React.FC<SearchFilterSectionProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter
}) => {
  return (
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
  );
};

export default SearchFilterSection;
