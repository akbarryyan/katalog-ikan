const db = require('../config/database');
const bcrypt = require('bcrypt');

class Admin {
  // Find admin by email
  static async findByEmail(email) {
    try {
      console.log('🔍 Searching admin with email:', email);
      
      const [rows] = await db.execute(
        'SELECT * FROM admin WHERE email = ? AND status = "aktif"',
        [email]
      );
      
      console.log('📊 Database query result:', rows.length, 'rows found');
      if (rows.length > 0) {
        console.log('👤 Admin found:', { 
          id: rows[0].id, 
          email: rows[0].email, 
          status: rows[0].status 
        });
      }
      
      return rows[0] || null;
    } catch (error) {
      console.error('❌ Error finding admin by email:', error);
      throw error;
    }
  }

  // Verify password
  static async verifyPassword(plainPassword, hashedPassword) {
    try {
      console.log('🔑 Verifying password...');
      console.log('📝 Plain password:', plainPassword ? '***' : 'undefined');
      console.log('🔐 Hashed password:', hashedPassword ? '***' : 'undefined');
      
      const result = await bcrypt.compare(plainPassword, hashedPassword);
      console.log('✅ Password verification result:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Error verifying password:', error);
      throw error;
    }
  }

  // Create new admin (for future use)
  static async create(adminData) {
    try {
      const { email, password, nama_lengkap } = adminData;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const [result] = await db.execute(
        'INSERT INTO admin (email, password, nama_lengkap, status) VALUES (?, ?, ?, "aktif")',
        [email, hashedPassword, nama_lengkap]
      );
      
      return result.insertId;
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  }

  // Get admin by ID
  static async findById(id) {
    try {
      const [rows] = await db.execute(
        'SELECT id, email, nama_lengkap, status, created_at FROM admin WHERE id = ?',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Error finding admin by ID:', error);
      throw error;
    }
  }
}

module.exports = Admin;
