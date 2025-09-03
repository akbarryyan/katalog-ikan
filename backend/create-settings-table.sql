-- Create settings table for website configuration
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
