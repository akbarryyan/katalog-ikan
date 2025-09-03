# 🌐 Dynamic Website Name di Sidebar

## 🎯 Overview
Fitur ini memungkinkan nama website di sidebar untuk berubah secara dinamis berdasarkan pengaturan yang disimpan di database. Nama website akan otomatis terupdate ketika admin mengubahnya di halaman Settings.

## 🔄 Flow Kerja

### 1. **Load Initial Data**
- Saat Sidebar component dimount, otomatis fetch nama website dari API
- Default fallback: "Ikan Oni" jika API gagal

### 2. **Real-time Updates**
- Ketika admin menyimpan settings di halaman Settings
- Event `settingsUpdated` di-dispatch ke window
- Sidebar mendengarkan event ini dan reload nama website

### 3. **Error Handling**
- Jika API gagal, tetap menggunakan nama default
- Console error untuk debugging

## 📁 File yang Dimodifikasi

### `frontend/src/components/Sidebar.tsx`
```typescript
// State untuk menyimpan nama website
const [websiteName, setWebsiteName] = useState('Ikan Oni');

// Load nama website dari API
useEffect(() => {
  const loadWebsiteName = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/settings/website');
      const result = await response.json();
      
      if (result.success && result.data.websiteName) {
        setWebsiteName(result.data.websiteName);
      }
    } catch (error) {
      console.error('Error loading website name:', error);
    }
  };

  loadWebsiteName();

  // Listen for settings changes
  const handleSettingsChange = () => {
    loadWebsiteName();
  };

  window.addEventListener('settingsUpdated', handleSettingsChange);
  return () => {
    window.removeEventListener('settingsUpdated', handleSettingsChange);
  };
}, []);

// Render nama website dinamis
<h1 style={{...}}>
  {websiteName}
</h1>
```

### `frontend/src/pages/Settings.tsx`
```typescript
// Dispatch event setelah settings tersimpan
if (result.success) {
  setMessage({ type: 'success', text: 'Pengaturan berhasil disimpan!' });
  
  // Notify other components
  window.dispatchEvent(new CustomEvent('settingsUpdated'));
}

// Dispatch event setelah settings direset
if (result.success) {
  setSettings(result.data);
  setMessage({ type: 'success', text: 'Pengaturan berhasil direset ke default!' });
  
  // Notify other components
  window.dispatchEvent(new CustomEvent('settingsUpdated'));
}
```

## 🚀 API Endpoint

### GET `/api/settings/website`
```json
{
  "success": true,
  "message": "Website settings berhasil diambil",
  "data": {
    "websiteName": "Nama Website Baru",
    "websiteDescription": "...",
    "primaryColor": "#00412E",
    "secondaryColor": "#96BF8A",
    // ... other settings
  }
}
```

## 🧪 Testing

### Manual Testing
1. **Buka halaman Settings**
   - Navigate ke `/settings`
   - Ubah nama website di field "Nama Website"
   - Klik "Simpan Pengaturan"

2. **Cek Sidebar**
   - Nama website di sidebar header harus berubah
   - Perubahan terjadi tanpa perlu refresh halaman

3. **Test Reset**
   - Klik "Reset ke Default" di Settings
   - Nama website di sidebar harus kembali ke "Ikan Oni"

### Console Testing
```javascript
// Test manual dispatch event
window.dispatchEvent(new CustomEvent('settingsUpdated'));

// Check current website name in Sidebar state
// (akan terlihat di console log)
```

## 🔧 Troubleshooting

### Nama website tidak berubah
- Cek console untuk error API
- Pastikan backend server berjalan
- Cek network tab untuk request ke `/api/settings/website`

### Event tidak ter-dispatch
- Pastikan Settings page berhasil save
- Cek console untuk error saat save
- Pastikan event listener terpasang di Sidebar

### API Error
- Pastikan table `settings` sudah dibuat
- Cek koneksi database
- Pastikan default settings sudah di-insert

## 📝 Notes

- **Real-time Updates**: Perubahan langsung terlihat tanpa refresh
- **Fallback**: Default "Ikan Oni" jika API gagal
- **Event-driven**: Menggunakan custom event untuk komunikasi antar component
- **Error Handling**: Graceful degradation jika API tidak tersedia
- **Performance**: Hanya fetch saat component mount dan saat ada perubahan

## 🎨 UI Impact

- **Sidebar Header**: Nama website dinamis di header sidebar
- **Consistency**: Nama website konsisten di seluruh aplikasi
- **User Experience**: Admin dapat melihat perubahan langsung
- **Branding**: Memungkinkan custom branding per deployment
