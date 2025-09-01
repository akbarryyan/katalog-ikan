# Backend API Ikan Oni

Backend server untuk aplikasi manajemen ikan dengan Express.js dan MySQL.

## 🚀 Quick Start

### Cara 1: Double Click (Recommended)
1. Double click file `start.bat`
2. Tunggu sampai muncul "Server berjalan di port 3001"
3. Backend siap digunakan!

### Cara 2: Manual
1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Jalankan server**
   ```bash
   npm run dev
   ```

## 📊 Database

Backend menggunakan tabel `fishs` yang sudah dibuat dengan struktur sesuai interface di frontend:

- `id` - Primary key (auto increment)
- `nama` - Nama ikan (varchar)
- `harga` - Harga per satuan (decimal)
- `satuanHarga` - Satuan harga (enum: kg, gram)
- `stok` - Jumlah stok tersedia (int)
- `status` - Status ketersediaan (enum: tersedia, habis, pre-order)
- `deskripsi` - Deskripsi ikan (text)
- `gambar` - Nama file gambar (varchar, nullable)
- `created_at` - Timestamp pembuatan
- `updated_at` - Timestamp update

## 🌐 API Endpoints

### Ikan (`/api/ikan`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Ambil semua data ikan |
| GET | `/:id` | Ambil data ikan berdasarkan ID |
| GET | `/search?q=keyword` | Cari ikan berdasarkan keyword |
| GET | `/status/:status` | Ambil ikan berdasarkan status |
| POST | `/` | Tambah ikan baru |
| PUT | `/:id` | Update data ikan |
| DELETE | `/:id` | Hapus data ikan |

### Admin (`/api/admin`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/login` | Login admin |
| GET | `/profile` | Ambil profil admin |

## ⚙️ Konfigurasi Database

Edit file `config/database.js` sesuai dengan konfigurasi MySQL Anda:

```javascript
const dbConfig = {
  host: 'localhost',        // Host MySQL
  user: 'root',            // Username MySQL
  password: '',            // Password MySQL
  database: 'ikan_oni',    // Nama database
};
```

## 🧪 Testing API

Setelah backend berjalan, test API dengan:

```bash
npm test
```

## 🚦 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## 🐛 Troubleshooting

### Database Connection Error
- Pastikan MySQL server berjalan
- Periksa konfigurasi database
- Pastikan database `ikan_oni` sudah dibuat

### Port Already in Use
- Ganti port di `server.js`
- Atau hentikan service yang menggunakan port 3001

### Module Not Found
- Jalankan `npm install`
- Periksa versi Node.js

## 📁 Struktur Folder

```
backend/
├── config/          # Konfigurasi database
├── controllers/     # Logic bisnis
├── middleware/      # Middleware Express
├── models/          # Model database
├── routes/          # Route definitions
├── server.js        # Entry point
├── start.bat        # Script untuk menjalankan backend
└── package.json     # Dependencies
```

## 📄 License

ISC License
