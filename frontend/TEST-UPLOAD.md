# 🧪 Testing Upload Gambar

## 🎯 Cara Testing Upload Gambar

### 1. **Manual Testing di Browser**

1. **Buka halaman ManageIkan**
   - Buka `http://localhost:5173/kelola-ikan`
   - Pastikan backend server berjalan di `http://localhost:3001`

2. **Test Upload via Form**
   - Klik tombol "Tambah Ikan Baru"
   - Pilih file gambar di field "Gambar Ikan"
   - Isi form dengan data:
     - Nama: "Ikan Test Upload"
     - Harga: 50000
     - Satuan: kg
     - Stok: 10
     - Status: tersedia
     - Deskripsi: "Ikan test untuk upload gambar"
   - Klik "Simpan Ikan"
   - Cek apakah gambar muncul di grid/list view

### 2. **Testing via Browser Console**

Buka Developer Tools (F12) dan jalankan:

```javascript
// Import utility test
import { testUploadWithTestFile } from './src/utils/uploadTest.ts';

// Test upload dengan file test
testUploadWithTestFile()
  .then(result => console.log('✅ Upload berhasil:', result))
  .catch(error => console.error('❌ Upload gagal:', error));
```

### 3. **Testing dengan File Gambar Asli**

```javascript
// Buat input file untuk testing
const input = document.createElement('input');
input.type = 'file';
input.accept = 'image/*';
input.onchange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    try {
      const formData = new FormData();
      formData.append('nama', 'Test Ikan Upload');
      formData.append('harga', '50000');
      formData.append('satuanHarga', 'kg');
      formData.append('stok', '10');
      formData.append('status', 'tersedia');
      formData.append('deskripsi', 'Ikan test untuk upload gambar');
      formData.append('gambar', file);

      const response = await fetch('http://localhost:3001/api/ikan', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      console.log('📊 Upload result:', result);
      
      if (result.success) {
        console.log('🖼️  Gambar URL:', `http://localhost:3001${result.data.gambar}`);
      }
    } catch (error) {
      console.error('💥 Error:', error);
    }
  }
};
input.click();
```

### 4. **Testing Backend API Langsung**

```bash
# Test dengan curl
curl -X POST http://localhost:3001/api/ikan \
  -F "nama=Test Ikan" \
  -F "harga=50000" \
  -F "satuanHarga=kg" \
  -F "stok=10" \
  -F "status=tersedia" \
  -F "deskripsi=Test ikan" \
  -F "gambar=@/path/to/image.jpg"
```

## 🔍 Checklist Testing

### ✅ Backend
- [ ] Server berjalan di port 3001
- [ ] Folder `uploads/ikan/` ada dan writable
- [ ] Multer middleware terkonfigurasi dengan benar
- [ ] Static files di-serve di `/uploads`

### ✅ Frontend
- [ ] Form upload gambar berfungsi
- [ ] FormData dikirim dengan benar
- [ ] Gambar ditampilkan setelah upload
- [ ] Error handling berfungsi

### ✅ Database
- [ ] Kolom `gambar` tersimpan dengan path yang benar
- [ ] Path gambar mengarah ke file yang ada
- [ ] Update/delete menghapus file lama

## 🐛 Troubleshooting

### Error: "Cannot read property 'filename' of undefined"
- Pastikan multer middleware terpasang di route
- Cek apakah file dikirim dengan field name 'gambar'

### Error: "ENOENT: no such file or directory"
- Pastikan folder `uploads/ikan/` sudah dibuat
- Cek permission folder

### Gambar tidak muncul
- Cek URL gambar di database
- Pastikan server serve static files
- Cek console browser untuk error loading

### Error: "File too large"
- Kurangi ukuran gambar
- Atau naikkan limit di `upload.js`

## 📊 Expected Results

### Successful Upload
```json
{
  "success": true,
  "message": "Ikan berhasil ditambahkan",
  "data": {
    "id": 1,
    "nama": "Test Ikan Upload",
    "harga": 50000,
    "satuanHarga": "kg",
    "stok": 10,
    "status": "tersedia",
    "deskripsi": "Ikan test untuk upload gambar",
    "gambar": "/uploads/ikan/ikan-1703123456789-123456789.jpg",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### Image URL
```
http://localhost:3001/uploads/ikan/ikan-1703123456789-123456789.jpg
```

## 🎉 Success Indicators

1. **Upload berhasil** - Response success: true
2. **File tersimpan** - File ada di folder `uploads/ikan/`
3. **Database updated** - Path gambar tersimpan di database
4. **Gambar muncul** - Gambar ditampilkan di ManageIkan
5. **URL accessible** - URL gambar bisa diakses langsung
