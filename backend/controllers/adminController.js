const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// JWT Secret (dalam production gunakan environment variable)
const JWT_SECRET = 'ikan_oni_secret_key_2025';

class AdminController {
  // Admin Login
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      
      console.log('🔍 Login attempt:', { email, password: password ? '***' : 'undefined' });

      // Validation
      if (!email || !password) {
        console.log('❌ Validation failed: missing email or password');
        return res.status(400).json({
          success: false,
          message: 'Email dan password harus diisi!'
        });
      }

      // Find admin by email
      const admin = await Admin.findByEmail(email);
      console.log('🔍 Admin found:', admin ? 'Yes' : 'No');
      
      if (!admin) {
        console.log('❌ Admin not found for email:', email);
        return res.status(401).json({
          success: false,
          message: 'Email atau password salah!'
        });
      }

      console.log('👤 Admin data:', { 
        id: admin.id, 
        email: admin.email, 
        status: admin.status,
        passwordHash: admin.password ? '***' : 'undefined'
      });

      // Verify password
      const isPasswordValid = await Admin.verifyPassword(password, admin.password);
      console.log('🔑 Password verification result:', isPasswordValid);
      
      if (!isPasswordValid) {
        console.log('❌ Password verification failed');
        return res.status(401).json({
          success: false,
          message: 'Email atau password salah!'
        });
      }

      // Check if admin is active
      if (admin.status !== 'aktif') {
        return res.status(403).json({
          success: false,
          message: 'Akun admin dinonaktifkan!'
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: admin.id, 
          email: admin.email,
          nama_lengkap: admin.nama_lengkap
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Remove password from response
      const { password: _, ...adminData } = admin;

      res.json({
        success: true,
        message: 'Login berhasil!',
        data: {
          admin: adminData,
          token
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server!'
      });
    }
  }

  // Get admin profile (protected route)
  static async getProfile(req, res) {
    try {
      const adminId = req.admin.id;
      const admin = await Admin.findById(adminId);
      
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: 'Admin tidak ditemukan!'
        });
      }

      res.json({
        success: true,
        data: admin
      });

    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server!'
      });
    }
  }

  // Logout (client-side token removal)
  static async logout(req, res) {
    try {
      res.json({
        success: true,
        message: 'Logout berhasil!'
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server!'
      });
    }
  }
}

module.exports = AdminController;
