const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Konfigurasi storage untuk multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Tentukan path upload berdasarkan nama field ('logo' atau 'gambar')
    let uploadPath = "uploads/";
    if (file.fieldname === "logo") {
      uploadPath += "logos/";
    } else if (file.fieldname === "gambar") {
      uploadPath += "ikan/";
    } else {
      // Folder default jika ada field lain
      uploadPath += "misc/";
    }

    // Buat direktori jika belum ada
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate nama file unik dengan timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const prefix = file.fieldname; // 'logo' atau 'gambar'
    cb(null, prefix + "-" + uniqueSuffix + extension);
  },
});

// Filter untuk memastikan hanya file gambar yang diupload
const fileFilter = (req, file, cb) => {
  // Cek apakah file adalah gambar
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file gambar yang diperbolehkan!"), false);
  }
};

// Konfigurasi multer
const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // Batas 5MB

module.exports = upload;