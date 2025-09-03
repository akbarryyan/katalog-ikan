# 📸 Sistem Upload Gambar Ikan

## 🎯 Overview
Sistem ini memungkinkan upload dan penyimpanan gambar ikan dengan fitur:
- Upload gambar dengan validasi tipe file
- Penyimpanan otomatis di folder `uploads/ikan/`
- Penghapusan gambar lama saat update/delete
- Serve static files untuk akses gambar

## 📁 Struktur Folder
```
backend/
├── uploads/
│   └── ikan/          # Folder penyimpanan gambar ikan
├── middleware/
│   └── upload.js      # Konfigurasi multer untuk upload
└── ...
```

## 🔧 Konfigurasi Multer

### File: `middleware/upload.js`
- **Storage**: Disk storage di folder `uploads/ikan/`
- **Filename**: Format `ikan-{timestamp}-{random}.{extension}`
- **File Filter**: Hanya file gambar yang diperbolehkan
- **Size Limit**: Maksimal 5MB per file

## 🚀 API Endpoints

### POST `/api/ikan` - Create Ikan dengan Gambar
```javascript
// FormData
const formData = new FormData();
formData.append('nama', 'Ikan Mas');
formData.append('harga', '50000');
formData.append('satuanHarga', 'kg');
formData.append('stok', '10');
formData.append('status', 'tersedia');
formData.append('deskripsi', 'Ikan mas segar');
formData.append('gambar', fileInput.files[0]); // File gambar

fetch('http://localhost:3001/api/ikan', {
  method: 'POST',
  body: formData
});
```

### PUT `/api/ikan/:id` - Update Ikan dengan Gambar
```javascript
// FormData (sama seperti create)
const formData = new FormData();
// ... data ikan
formData.append('gambar', newFile); // File gambar baru

fetch(`http://localhost:3001/api/ikan/${id}`, {
  method: 'PUT',
  body: formData
});
```

## 🖼️ Akses Gambar

### URL Format
```
http://localhost:3001/uploads/ikan/ikan-{timestamp}-{random}.{extension}
```

### Contoh
```
http://localhost:3001/uploads/ikan/ikan-1703123456789-123456789.jpg
```

## 🔄 Flow Upload

1. **Frontend**: User pilih file gambar di form
2. **FormData**: Data form + file dikirim sebagai FormData
3. **Multer**: File disimpan di `uploads/ikan/` dengan nama unik
4. **Database**: Path gambar disimpan di kolom `gambar`
5. **Response**: URL gambar dikembalikan ke frontend

## 🗑️ Penghapusan Gambar

### Saat Update
- Gambar lama dihapus dari filesystem
- Gambar baru disimpan
- Database diupdate dengan path baru

### Saat Delete
- Gambar dihapus dari filesystem
- Record dihapus dari database

## 🛡️ Validasi

### File Type
- Hanya file dengan MIME type `image/*`
- Ekstensi: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

### File Size
- Maksimal 5MB per file
- Error jika melebihi limit

### Error Handling
```javascript
// Error response
{
  "success": false,
  "message": "Hanya file gambar yang diperbolehkan!"
}
```

## 🧪 Testing

### Manual Test
```bash
# Jalankan server
npm start

# Test upload (di folder backend)
node test-upload.js
```

### Frontend Test
1. Buka halaman ManageIkan
2. Klik "Tambah Ikan Baru"
3. Pilih file gambar
4. Isi form dan submit
5. Cek apakah gambar muncul di grid/list view

## 📝 Notes

- Pastikan folder `uploads/ikan/` ada dan writable
- Server harus di-restart setelah perubahan konfigurasi
- Gambar di-serve sebagai static files di `/uploads`
- Nama file dibuat unik untuk menghindari konflik

## 🔧 Troubleshooting

### Error: "ENOENT: no such file or directory"
- Pastikan folder `uploads/ikan/` sudah dibuat
- Cek permission folder

### Error: "File too large"
- Kurangi ukuran gambar
- Atau naikkan limit di `upload.js`

### Gambar tidak muncul
- Cek URL gambar di database
- Pastikan server serve static files di `/uploads`
- Cek console browser untuk error loading gambar
