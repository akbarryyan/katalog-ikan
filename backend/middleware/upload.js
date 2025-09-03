const multer = require('multer');
const path = require('path');

// Konfigurasi storage untuk multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/ikan/');
  },
  filename: function (req, file, cb) {
    // Generate nama file unik dengan timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, 'ikan-' + uniqueSuffix + extension);
  }
});

// Filter untuk memastikan hanya file gambar yang diupload
const fileFilter = (req, file, cb) => {
  // Cek apakah file adalah gambar
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar yang diperbolehkan!'), false);
  }
};

// Konfigurasi multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Batas ukuran file 5MB
  }
});

module.exports = upload;
