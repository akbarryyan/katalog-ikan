# 🔄 Admin Routing - Pemisahan User & Admin

## 🎯 Overview
Implementasi pemisahan routing antara halaman user dan admin panel dengan admin diakses melalui `/sys` dan halaman utama `/` untuk users.

## 🏗️ Struktur Routing Baru

### **Sebelum:**
```
/ → Admin Login/Dashboard
/login → Admin Login
/dashboard → Admin Dashboard
/kelola-ikan → Manage Ikan
/settings → Settings
```

### **Sesudah:**
```
/ → HomePage (User)
/sys → Admin Login/Dashboard
/sys/dashboard → Admin Dashboard
/sys/kelola-ikan → Manage Ikan
/sys/settings → Settings
```

## 📁 File Structure

### **New Files:**
- `frontend/src/pages/HomePage.tsx` - Halaman utama untuk users
- `frontend/src/MainRouter.tsx` - Router utama yang menangani routing user/admin
- `frontend/src/AdminRouter.tsx` - Router khusus untuk admin dengan prefix `/sys`

### **Modified Files:**
- `frontend/src/App.tsx` - Menggunakan MainRouter
- `frontend/src/pages/AdminDashboard.tsx` - Tambah tombol "Kembali ke Website"
- `frontend/src/pages/ManageIkan.tsx` - Tambah tombol "Kembali ke Website"
- `frontend/src/pages/Settings.tsx` - Tambah tombol "Kembali ke Website"

## 🎨 Fitur HomePage (User)

### **Tampilan Utama:**
- **Header** dengan nama website dan tombol "Admin Login"
- **Search & Filter** untuk mencari ikan
- **Grid Ikan** dengan card yang menampilkan:
  - Gambar ikan (dengan fallback placeholder)
  - Nama ikan
  - Harga dengan format Rupiah
  - Status (Tersedia/Habis)
  - Stok
  - Deskripsi
  - Tombol "Pesan" (disabled jika habis)
- **Footer** dengan informasi website

### **Fitur Pencarian:**
- Search by nama ikan atau deskripsi
- Filter by status (Semua/Tersedia/Habis)
- Real-time filtering

### **Responsive Design:**
- Grid responsive (1-4 kolom berdasarkan screen size)
- Mobile-friendly layout
- Touch-friendly buttons

## 🔧 Admin Router (/sys)

### **URL Structure:**
- `/sys` → Admin Login (jika belum login) / Dashboard (jika sudah login)
- `/sys/dashboard` → Admin Dashboard
- `/sys/kelola-ikan` → Manage Ikan
- `/sys/settings` → Settings

### **Navigation:**
- Semua halaman admin memiliki tombol "Kembali ke Website" (🌐)
- Tombol responsive (desktop: inline, mobile: full width)
- Direct link ke halaman utama (`/`)

## 🎯 MainRouter Logic

### **Routing Logic:**
```typescript
// Route based on current path
if (currentPath.startsWith('/sys')) {
  return <AdminRouter />;
} else {
  return <HomePage />;
}
```

### **URL Handling:**
- Listen untuk perubahan URL dengan `popstate` event
- Update state ketika URL berubah
- Support browser back/forward buttons

## 🔄 AdminRouter Logic

### **URL Processing:**
```typescript
// Check current URL to set initial route
const path = window.location.pathname;
if (path === '/sys' || path === '/sys/') {
  setCurrentRoute('dashboard');
} else {
  const route = path.replace('/sys/', '') as AdminRoute;
  // Handle routing...
}
```

### **Navigation with /sys prefix:**
```typescript
// Update URL based on route with /sys prefix
if (route === 'dashboard') {
  window.history.pushState({}, '', '/sys');
} else {
  window.history.pushState({}, '', `/sys/${route}`);
}
```

## 🎨 UI/UX Improvements

### **Back to Website Button:**
- **Desktop**: Inline button di header
- **Mobile**: Full width button di bawah header
- **Styling**: Consistent dengan theme admin
- **Icon**: 🌐 untuk visual clarity

### **HomePage Features:**
- **Loading State**: Spinner saat fetch data
- **Error State**: Error message dengan retry button
- **Empty State**: Placeholder saat tidak ada data
- **Image Fallback**: SVG placeholder jika gambar gagal load

## 📱 Responsive Design

### **HomePage:**
- **Mobile**: 1 kolom grid, full width buttons
- **Tablet**: 2 kolom grid
- **Desktop**: 3-4 kolom grid

### **Admin Pages:**
- **Mobile**: Full width "Kembali ke Website" button
- **Desktop**: Inline "Kembali ke Website" button

## 🔗 Navigation Flow

### **User Journey:**
1. User akses `/` → Melihat HomePage
2. User klik "Admin Login" → Redirect ke `/sys`
3. Admin login → Redirect ke `/sys/dashboard`
4. Admin klik "Kembali ke Website" → Redirect ke `/`

### **Admin Journey:**
1. Admin akses `/sys` → Login page
2. Admin login → Dashboard
3. Admin navigate ke halaman lain → Tetap di `/sys/*`
4. Admin klik "Kembali ke Website" → Redirect ke `/`

## 🧪 Testing

### **Manual Testing:**
1. **Akses `/`** → Harus tampil HomePage
2. **Akses `/sys`** → Harus tampil Admin Login
3. **Login admin** → Harus redirect ke `/sys/dashboard`
4. **Navigate admin** → URL harus tetap `/sys/*`
5. **Klik "Kembali ke Website"** → Harus redirect ke `/`
6. **Browser back/forward** → Harus berfungsi dengan benar

### **URL Testing:**
- `/` → HomePage
- `/sys` → Admin Login/Dashboard
- `/sys/dashboard` → Admin Dashboard
- `/sys/kelola-ikan` → Manage Ikan
- `/sys/settings` → Settings
- `/invalid` → HomePage (fallback)

## 🎉 Benefits

### **Separation of Concerns:**
- ✅ **User Interface** terpisah dari Admin Interface
- ✅ **Clean URL Structure** dengan prefix yang jelas
- ✅ **Easy Navigation** antara user dan admin
- ✅ **Maintainable Code** dengan router terpisah

### **User Experience:**
- ✅ **Public Website** untuk users
- ✅ **Admin Panel** untuk administrators
- ✅ **Seamless Navigation** antara kedua interface
- ✅ **Responsive Design** di semua device

### **Developer Experience:**
- ✅ **Modular Structure** dengan router terpisah
- ✅ **Easy Maintenance** dengan kode yang terorganisir
- ✅ **Clear Separation** antara user dan admin logic
- ✅ **Reusable Components** untuk kedua interface

## 📝 Notes

- **Backward Compatibility**: Router lama (`router.tsx`) masih ada untuk reference
- **URL Prefix**: Admin menggunakan `/sys` prefix untuk semua routes
- **Navigation**: Semua halaman admin memiliki tombol kembali ke website
- **Responsive**: Design responsive di semua screen size
- **Error Handling**: Proper error handling untuk semua states

## 🔄 Migration

### **From Old Router:**
1. **Backup** `router.tsx` sebagai reference
2. **Create** `MainRouter.tsx` dan `AdminRouter.tsx`
3. **Update** `App.tsx` untuk menggunakan `MainRouter`
4. **Add** `HomePage.tsx` untuk user interface
5. **Update** semua admin pages dengan tombol "Kembali ke Website"

### **Testing:**
1. **Test** semua routes berfungsi dengan benar
2. **Test** navigation antara user dan admin
3. **Test** responsive design di berbagai device
4. **Test** browser back/forward buttons

## 🎯 Result

Sekarang aplikasi memiliki struktur routing yang jelas:
- ✅ **`/`** → HomePage untuk users
- ✅ **`/sys`** → Admin panel untuk administrators
- ✅ **Seamless Navigation** antara kedua interface
- ✅ **Responsive Design** di semua device
- ✅ **Clean URL Structure** dengan prefix yang jelas

Admin panel sekarang diakses melalui `/sys` dan halaman utama `/` untuk users! 🎉✨
