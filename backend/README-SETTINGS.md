# ⚙️ Sistem Settings Website

## 🎯 Overview
Sistem ini memungkinkan pengelolaan pengaturan website secara dinamis melalui admin panel dengan fitur:
- Pengaturan nama website dan deskripsi
- Konfigurasi warna tema (primer & sekunder)
- Informasi kontak (email, telepon, alamat)
- URL logo website
- Reset ke pengaturan default

## 📁 Struktur File
```
backend/
├── models/
│   └── Settings.js          # Model untuk database settings
├── controllers/
│   └── settingsController.js # Controller untuk business logic
├── routes/
│   └── settingsRoutes.js    # Routes untuk API endpoints
├── create-settings-table.sql # SQL untuk membuat table settings
└── README-SETTINGS.md       # Dokumentasi ini
```

## 🗄️ Database Schema

### Table: `settings`
```sql
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Default Settings
- `websiteName`: Nama website
- `websiteDescription`: Deskripsi website
- `primaryColor`: Warna primer (#00412E)
- `secondaryColor`: Warna sekunder (#96BF8A)
- `logoUrl`: URL logo website
- `contactEmail`: Email kontak
- `contactPhone`: Nomor telepon
- `address`: Alamat perusahaan

## 🚀 API Endpoints

### GET `/api/settings`
Mengambil semua settings
```json
{
  "success": true,
  "message": "Settings berhasil diambil",
  "data": [
    {
      "id": 1,
      "setting_key": "websiteName",
      "setting_value": "Ikan Oni",
      "description": "Nama website",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET `/api/settings/website`
Mengambil website settings dalam format object
```json
{
  "success": true,
  "message": "Website settings berhasil diambil",
  "data": {
    "websiteName": "Ikan Oni",
    "websiteDescription": "Platform penjualan ikan segar terpercaya",
    "primaryColor": "#00412E",
    "secondaryColor": "#96BF8A",
    "logoUrl": "",
    "contactEmail": "admin@ikanoni.com",
    "contactPhone": "+62 812-3456-7890",
    "address": "Jl. Ikan Segar No. 123, Jakarta"
  }
}
```

### PUT `/api/settings/website`
Update website settings
```javascript
// Request Body
{
  "websiteName": "Ikan Oni Baru",
  "websiteDescription": "Platform terbaru untuk penjualan ikan",
  "primaryColor": "#FF0000",
  "secondaryColor": "#00FF00",
  "logoUrl": "https://example.com/logo.png",
  "contactEmail": "new@ikanoni.com",
  "contactPhone": "+62 812-9999-8888",
  "address": "Jl. Baru No. 456, Bandung"
}

// Response
{
  "success": true,
  "message": "Website settings berhasil diperbarui",
  "data": { /* updated settings */ }
}
```

### GET `/api/settings/:key`
Mengambil single setting by key
```json
{
  "success": true,
  "message": "Setting berhasil diambil",
  "data": {
    "id": 1,
    "setting_key": "websiteName",
    "setting_value": "Ikan Oni",
    "description": "Nama website"
  }
}
```

### PUT `/api/settings/:key`
Update single setting
```javascript
// Request Body
{
  "value": "Ikan Oni Baru",
  "description": "Nama website yang baru"
}

// Response
{
  "success": true,
  "message": "Setting berhasil diperbarui",
  "data": {
    "id": 1,
    "setting_key": "websiteName",
    "setting_value": "Ikan Oni Baru",
    "description": "Nama website yang baru",
    "updated": true
  }
}
```

### DELETE `/api/settings/:key`
Hapus setting
```json
{
  "success": true,
  "message": "Setting berhasil dihapus"
}
```

### POST `/api/settings/reset`
Reset semua settings ke default
```json
{
  "success": true,
  "message": "Settings berhasil direset ke default",
  "data": {
    "websiteName": "Ikan Oni",
    "websiteDescription": "Platform penjualan ikan segar terpercaya",
    "primaryColor": "#00412E",
    "secondaryColor": "#96BF8A",
    "logoUrl": "",
    "contactEmail": "admin@ikanoni.com",
    "contactPhone": "+62 812-3456-7890",
    "address": "Jl. Ikan Segar No. 123, Jakarta"
  }
}
```

## 🔧 Setup Database

1. **Jalankan SQL untuk membuat table:**
```bash
# Di phpMyAdmin atau MySQL client
mysql -u username -p database_name < create-settings-table.sql
```

2. **Atau copy-paste SQL berikut di phpMyAdmin:**
```sql
-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO settings (setting_key, setting_value, description) VALUES
('websiteName', 'Ikan Oni', 'Nama website'),
('websiteDescription', 'Platform penjualan ikan segar terpercaya', 'Deskripsi website'),
('primaryColor', '#00412E', 'Warna primer website'),
('secondaryColor', '#96BF8A', 'Warna sekunder website'),
('logoUrl', '', 'URL logo website'),
('contactEmail', 'admin@ikanoni.com', 'Email kontak'),
('contactPhone', '+62 812-3456-7890', 'Nomor telepon kontak'),
('address', 'Jl. Ikan Segar No. 123, Jakarta', 'Alamat perusahaan')
ON DUPLICATE KEY UPDATE
setting_value = VALUES(setting_value),
description = VALUES(description),
updated_at = CURRENT_TIMESTAMP;
```

## 🧪 Testing

### Manual Testing
1. **Buka halaman Settings:**
   - Navigate ke `/settings` di admin panel
   - Pastikan settings dimuat dari database

2. **Test Update Settings:**
   - Ubah nama website
   - Ubah warna tema
   - Klik "Simpan Pengaturan"
   - Cek apakah perubahan tersimpan

3. **Test Reset:**
   - Klik "Reset ke Default"
   - Cek apakah settings kembali ke default

### API Testing
```bash
# Test get website settings
curl -X GET http://localhost:3001/api/settings/website

# Test update website settings
curl -X PUT http://localhost:3001/api/settings/website \
  -H "Content-Type: application/json" \
  -d '{
    "websiteName": "Test Website",
    "websiteDescription": "Test Description",
    "primaryColor": "#FF0000",
    "secondaryColor": "#00FF00"
  }'

# Test reset settings
curl -X POST http://localhost:3001/api/settings/reset
```

## 🎨 Frontend Integration

### Halaman Settings
- **Route:** `/settings`
- **Component:** `Settings.tsx`
- **Features:**
  - Form untuk mengubah semua pengaturan
  - Preview real-time
  - Color picker untuk tema
  - Loading states
  - Success/error messages

### Menu Navigation
- **Sidebar:** Menu "Settings" dengan icon Settings
- **Active State:** Highlight saat di halaman settings
- **Responsive:** Mobile-friendly

## 🔄 Flow Penggunaan

1. **Admin Login** → Navigate ke Settings
2. **Load Settings** → Ambil data dari API
3. **Edit Settings** → Ubah form fields
4. **Preview** → Lihat perubahan real-time
5. **Save** → Kirim ke API untuk disimpan
6. **Success** → Tampilkan konfirmasi

## 🛡️ Validasi

### Backend Validation
- Nama website dan deskripsi wajib diisi
- Format email harus valid
- Warna harus format hex (#RRGGBB)
- URL logo harus format valid

### Frontend Validation
- Real-time validation pada form
- Disable submit jika data tidak valid
- Error messages yang informatif

## 📝 Notes

- Settings disimpan di database MySQL
- Perubahan langsung tersimpan dan dapat diakses
- Support untuk multiple settings dengan key-value system
- Timestamp otomatis untuk tracking perubahan
- Error handling yang comprehensive

## 🔧 Troubleshooting

### Error: "Table 'settings' doesn't exist"
- Pastikan sudah menjalankan SQL untuk membuat table
- Cek koneksi database

### Error: "Cannot read property 'websiteName' of undefined"
- Pastikan default settings sudah di-insert
- Cek API response format

### Settings tidak tersimpan
- Cek network tab di browser
- Cek server logs untuk error
- Pastikan database connection berfungsi
