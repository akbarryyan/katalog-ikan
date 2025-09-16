-- Insert websiteTitle dan default settings lainnya
INSERT INTO settings (setting_key, setting_value, description, created_at, updated_at) 
VALUES 
  ('websiteTitle', 'Ikan Oni - Platform Penjualan Ikan Segar', 'Title website untuk SEO dan tab browser', NOW(), NOW()),
  ('websiteName', 'Ikan Oni', 'Nama website', NOW(), NOW()),
  ('websiteDescription', 'Platform penjualan ikan segar terpercaya', 'Deskripsi website', NOW(), NOW()),
  ('primaryColor', '#00412E', 'Warna primer website', NOW(), NOW()),
  ('secondaryColor', '#96BF8A', 'Warna sekunder website', NOW(), NOW()),
  ('logoUrl', '', 'URL logo website', NOW(), NOW()),
  ('contactEmail', 'admin@ikanoni.com', 'Email kontak', NOW(), NOW()),
  ('contactPhone', '+62 812-3456-7890', 'Nomor telepon kontak', NOW(), NOW()),
  ('address', 'Jl. Ikan Segar No. 123, Jakarta', 'Alamat', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
  setting_value = VALUES(setting_value),
  description = VALUES(description),
  updated_at = NOW();

-- Verify data
SELECT * FROM settings WHERE setting_key = 'websiteTitle';