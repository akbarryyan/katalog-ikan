-- Database: ikan_oni
-- Buat database jika belum ada
CREATE DATABASE IF NOT EXISTS `ikan_oni` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `ikan_oni`;

-- Drop table jika sudah ada
DROP TABLE IF EXISTS `admin`;

-- Create table admin
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama_lengkap` varchar(255) DEFAULT NULL,
  `status` enum('aktif','nonaktif') DEFAULT 'aktif',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert data admin dengan password: password123
-- Hash: $2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO `admin` (`email`, `password`, `nama_lengkap`, `status`) VALUES
('admin@ikan.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator Utama', 'aktif'

-- Verifikasi data
SELECT * FROM `admin`;

-- Tampilkan struktur table
DESCRIBE `admin`;
