import { useState } from 'react';
import { Upload, X, Save, ArrowLeft } from 'lucide-react';

interface FormIkanProps {
  mode: 'add' | 'edit';
  onCancel: () => void;
  onSave: (data: IkanFormData) => void;
  initialData?: IkanFormData;
}

interface IkanFormData {
  nama: string;
  harga: string;
  stok: 'tersedia' | 'tidak_tersedia';
  kategori: 'air_tawar' | 'laut';
  ukuran: 'kecil' | 'sedang' | 'besar';
  deskripsi: string;
  gambar: File | null;
  gambarPreview?: string;
}

const FormIkan = ({ mode, onCancel, onSave, initialData }: FormIkanProps) => {
  const [formData, setFormData] = useState<IkanFormData>(
    initialData || {
      nama: '',
      harga: '',
      stok: 'tersedia',
      kategori: 'air_tawar',
      ukuran: 'sedang',
      deskripsi: '',
      gambar: null
    }
  );

  const [errors, setErrors] = useState<Partial<IkanFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof IkanFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ 
        ...prev, 
        gambar: file,
        gambarPreview: URL.createObjectURL(file)
      }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ 
      ...prev, 
      gambar: null,
      gambarPreview: undefined
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<IkanFormData> = {};

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama ikan harus diisi';
    }
    if (!formData.harga) {
      newErrors.harga = 'Harga harus diisi';
    } else if (isNaN(Number(formData.harga)) || Number(formData.harga) <= 0) {
      newErrors.harga = 'Harga harus berupa angka positif';
    }
    if (!formData.deskripsi.trim()) {
      newErrors.deskripsi = 'Deskripsi harus diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onCancel}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
          style={{ fontFamily: 'Hanken Grotesk' }}
        >
          <ArrowLeft size={20} className="mr-2" />
          Kembali
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Hanken Grotesk' }}>
            {mode === 'add' ? 'Tambah Ikan Baru' : 'Edit Ikan'}
          </h2>
          <p className="text-gray-600 mt-2" style={{ fontFamily: 'Hanken Grotesk' }}>
            {mode === 'add' 
              ? 'Isi form di bawah untuk menambahkan ikan baru ke katalog' 
              : 'Edit informasi ikan yang sudah ada'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama Ikan */}
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
              Nama Ikan *
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.nama ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Contoh: Ikan Gurame, Ikan Mas, dll"
              style={{ fontFamily: 'Hanken Grotesk' }}
            />
            {errors.nama && (
              <p className="mt-1 text-sm text-red-600" style={{ fontFamily: 'Hanken Grotesk' }}>
                {errors.nama}
              </p>
            )}
          </div>

          {/* Harga dan Stok */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="harga" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                Harga (Rp) *
              </label>
              <input
                type="text"
                id="harga"
                name="harga"
                value={formData.harga}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.harga ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="50000"
                style={{ fontFamily: 'Hanken Grotesk' }}
              />
              {errors.harga && (
                <p className="mt-1 text-sm text-red-600" style={{ fontFamily: 'Hanken Grotesk' }}>
                  {errors.harga}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="stok" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                Status Stok
              </label>
              <select
                id="stok"
                name="stok"
                value={formData.stok}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                style={{ fontFamily: 'Hanken Grotesk' }}
              >
                <option value="tersedia">Tersedia</option>
                <option value="tidak_tersedia">Tidak Tersedia</option>
              </select>
            </div>
          </div>

          {/* Kategori dan Ukuran */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                Kategori
              </label>
              <select
                id="kategori"
                name="kategori"
                value={formData.kategori}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                style={{ fontFamily: 'Hanken Grotesk' }}
              >
                <option value="air_tawar">Air Tawar</option>
                <option value="laut">Laut</option>
              </select>
            </div>

            <div>
              <label htmlFor="ukuran" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                Ukuran
              </label>
              <select
                id="ukuran"
                name="ukuran"
                value={formData.ukuran}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                style={{ fontFamily: 'Hanken Grotesk' }}
              >
                <option value="kecil">Kecil</option>
                <option value="sedang">Sedang</option>
                <option value="besar">Besar</option>
              </select>
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
              Deskripsi *
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.deskripsi ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Deskripsi singkat tentang ikan (maksimal 2-3 baris)"
              style={{ fontFamily: 'Hanken Grotesk' }}
            />
            {errors.deskripsi && (
              <p className="mt-1 text-sm text-red-600" style={{ fontFamily: 'Hanken Grotesk' }}>
                {errors.deskripsi}
              </p>
            )}
          </div>

          {/* Upload Gambar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
              Gambar Ikan
            </label>
            
            {formData.gambarPreview ? (
              <div className="relative inline-block">
                <img
                  src={formData.gambarPreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                <input
                  type="file"
                  id="gambar"
                  name="gambar"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label htmlFor="gambar" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Hanken Grotesk' }}>
                    <span className="font-medium text-blue-600 hover:text-blue-500">
                      Klik untuk upload
                    </span>{' '}
                    atau drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Hanken Grotesk' }}>
                    PNG, JPG, GIF hingga 10MB
                  </p>
                </label>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              style={{ fontFamily: 'Hanken Grotesk' }}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium flex items-center"
              style={{ fontFamily: 'Hanken Grotesk' }}
            >
              <Save size={20} className="mr-2" />
              {mode === 'add' ? 'Simpan Ikan' : 'Update Ikan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormIkan;
