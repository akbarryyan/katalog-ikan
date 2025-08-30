const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const JWT_SECRET = 'ikan_oni_secret_key_2025';

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak ditemukan!'
      });
    }

    // Extract token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if admin still exists and is active
    const admin = await Admin.findById(decoded.id);
    if (!admin || admin.status !== 'aktif') {
      return res.status(401).json({
        success: false,
        message: 'Token tidak valid atau admin dinonaktifkan!'
      });
    }

    // Add admin info to request
    req.admin = {
      id: admin.id,
      email: admin.email,
      nama_lengkap: admin.nama_lengkap
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token tidak valid!'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token sudah expired!'
      });
    }

    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server!'
    });
  }
};

module.exports = authMiddleware;
