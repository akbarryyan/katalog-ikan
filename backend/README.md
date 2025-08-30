# 🐟 Backend Ikan Oni

Backend API untuk website jual ikan dengan admin dashboard.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
- Buat database MySQL: `ikan_oni`
- Import file `database.sql` ke phpMyAdmin
- Update konfigurasi database di `config/database.js`

### 3. Start Server
```bash
npm run dev
```

Server akan berjalan di `http://localhost:5000`

## 📁 Struktur Project

```
backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   └── adminController.js   # Admin logic
├── middleware/
│   └── auth.js             # JWT authentication
├── models/
│   └── Admin.js            # Admin model
├── routes/
│   └── adminRoutes.js      # Admin routes
├── server.js               # Main server file
├── database.sql            # Database setup script
└── package.json
```

## 🔐 API Endpoints

### Admin Routes (`/api/admin`)

#### POST `/login`
Login admin dengan email dan password.

**Request:**
```json
{
  "email": "admin@ikan.com",
  "password": "password123"
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Login berhasil!",
  "data": {
    "admin": {
      "id": 1,
      "email": "admin@ikan.com",
      "nama_lengkap": "Administrator Utama",
      "status": "aktif",
      "created_at": "2025-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### GET `/profile` (Protected)
Get profile admin yang sedang login.

**Headers:**
```
Authorization: Bearer <token>
```

#### POST `/logout` (Protected)
Logout admin.

## 🗄️ Database Schema

### Table: `admin`
- `id` - Primary key (auto increment)
- `email` - Email admin (unique)
- `password` - Password hash (bcrypt)
- `nama_lengkap` - Nama lengkap admin
- `status` - Status aktif/nonaktif
- `created_at` - Waktu pembuatan
- `updated_at` - Waktu update

## 🔑 Credentials Default

```
Email: admin@ikan.com
Password: password123
```

## 🛡️ Security Features

- **Password Hashing**: Menggunakan bcrypt
- **JWT Authentication**: Token-based auth
- **Input Validation**: Validasi email dan password
- **CORS**: Cross-origin resource sharing
- **Error Handling**: Comprehensive error responses

## 📦 Dependencies

- `express` - Web framework
- `mysql2` - MySQL driver
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT tokens
- `cors` - CORS middleware
- `nodemon` - Development server

## 🚨 Environment Variables

Buat file `.env` untuk production:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ikan_oni
JWT_SECRET=your_secret_key
PORT=5000
```

## 🔧 Development

### Start Development Server
```bash
npm run dev
```

### Start Production Server
```bash
npm start
```

## 📝 Notes

- JWT secret key default: `ikan_oni_secret_key_2025`
- Password hash untuk `password123`: `$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi`
- Token expires dalam 24 jam
- Database menggunakan MySQL dengan charset utf8mb4
