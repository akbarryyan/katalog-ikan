import { useState } from 'react';
import { Fish, Upload, X, Save, AlertCircle } from 'lucide-react';

interface FormTambahIkanProps {
  onSave: (data: any) => void;
  onCancel: () => void;
}

const FormTambahIkan = ({ onSave, onCancel }: FormTambahIkanProps) => {
  const [formData, setFormData] = useState({
    nama: '',
    harga: '',
    satuanHarga: 'kg',
    stok: '',
    status: 'tersedia',
    deskripsi: '',
    gambar: null as File | null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | File) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama ikan harus diisi';
    }
    if (!formData.harga) {
      newErrors.harga = 'Harga harus diisi';
    } else if (isNaN(Number(formData.harga)) || Number(formData.harga) <= 0) {
      newErrors.harga = 'Harga harus berupa angka positif';
    }
    if (!formData.stok) {
      newErrors.stok = 'Stok harus diisi';
    } else if (isNaN(Number(formData.stok)) || Number(formData.stok) < 0) {
      newErrors.stok = 'Stok harus berupa angka non-negatif';
    }
    if (!formData.deskripsi.trim()) {
      newErrors.deskripsi = 'Deskripsi harus diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave(formData);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, gambar: 'Ukuran file maksimal 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, gambar: file }));
      setErrors(prev => ({ ...prev, gambar: '' }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, gambar: null }));
    setErrors(prev => ({ ...prev, gambar: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nama Ikan */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
          🐟 Nama Ikan <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.nama}
          onChange={(e) => handleInputChange('nama', e.target.value)}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] transition-all duration-200 ${
            errors.nama ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
          }`}
          placeholder="Contoh: Ikan Gurame, Ikan Mas, dll"
          style={{ fontFamily: 'Hanken Grotesk' }}
        />
        {errors.nama && (
          <div className="flex items-center mt-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.nama}
          </div>
        )}
      </div>

      {/* Harga & Satuan Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
            💰 Harga (IDR) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rp</span>
            <input
              type="text"
              value={formData.harga}
              onChange={(e) => handleInputChange('harga', e.target.value)}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] transition-all duration-200 ${
                errors.harga ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
              }`}
              placeholder="0"
              style={{ fontFamily: 'Hanken Grotesk' }}
            />
          </div>
          {errors.harga && (
            <div className="flex items-center mt-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.harga}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
            ⚖️ Satuan Harga
          </label>
          <select
            value={formData.satuanHarga}
            onChange={(e) => handleInputChange('satuanHarga', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] transition-all duration-200 appearance-none cursor-pointer bg-white"
            style={{ fontFamily: 'Hanken Grotesk' }}
          >
            <option value="kg">⚖️ Per Kilogram (kg)</option>
            <option value="gram">⚖️ Per Gram (g)</option>
          </select>
        </div>
      </div>

      {/* Stok */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
          📦 Stok <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={formData.stok}
          onChange={(e) => handleInputChange('stok', e.target.value)}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] transition-all duration-200 ${
            errors.stok ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
          }`}
          placeholder="0"
          min="0"
          style={{ fontFamily: 'Hanken Grotesk' }}
        />
        {errors.stok && (
          <div className="flex items-center mt-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.stok}
          </div>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
          📋 Status Ketersediaan
        </label>
        <select
          value={formData.status}
          onChange={(e) => handleInputChange('status', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] transition-all duration-200 appearance-none cursor-pointer bg-white"
          style={{ fontFamily: 'Hanken Grotesk' }}
        >
          <option value="tersedia">✅ Tersedia</option>
          <option value="habis">❌ Habis Stok</option>
          <option value="pre-order">⏳ Pre-Order</option>
        </select>
      </div>

      {/* Deskripsi */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
          📝 Deskripsi <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.deskripsi}
          onChange={(e) => handleInputChange('deskripsi', e.target.value)}
          rows={4}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] transition-all duration-200 resize-none ${
            errors.deskripsi ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
          }`}
          placeholder="Deskripsikan ikan (rasa, tekstur, cara masak, dll)"
          style={{ fontFamily: 'Hanken Grotesk' }}
        />
        {errors.deskripsi && (
          <div className="flex items-center mt-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.deskripsi}
          </div>
        )}
      </div>

      {/* Upload Gambar */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
          🖼️ Gambar Ikan
        </label>
        <div className="space-y-3">
          {formData.gambar ? (
            <div className="relative">
              <div className="flex items-center p-4 border border-gray-300 rounded-xl bg-gray-50">
                <Fish className="w-8 h-8 text-[#96BF8A] mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Hanken Grotesk' }}>
                    {formData.gambar.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(formData.gambar.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#96BF8A] transition-colors duration-200">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Hanken Grotesk' }}>
                  Klik untuk upload gambar
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, JPEG maksimal 5MB
                </p>
              </label>
            </div>
          )}
          {errors.gambar && (
            <div className="flex items-center text-sm text-red-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.gambar}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ fontFamily: 'Hanken Grotesk' }}
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-gradient-to-r from-[#00412E] to-[#96BF8A] text-white font-medium rounded-xl hover:from-[#96BF8A] hover:to-[#00412E] transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          style={{ fontFamily: 'Hanken Grotesk' }}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Simpan Ikan
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default FormTambahIkan;
