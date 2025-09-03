// Test sederhana untuk memastikan multer terinstall
const multer = require('multer');
const path = require('path');

console.log('✅ Multer berhasil diimport');
console.log('📁 Path module:', path.resolve(__dirname));

// Test konfigurasi storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/ikan/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, 'ikan-' + uniqueSuffix + extension);
  }
});

console.log('✅ Storage configuration berhasil dibuat');

// Test upload middleware
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Hanya file gambar yang diperbolehkan!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

console.log('✅ Upload middleware berhasil dibuat');
console.log('🎉 Semua konfigurasi upload siap digunakan!');
