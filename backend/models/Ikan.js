const db = require('../config/database');

class Ikan {
  // Get all ikan
  static async getAll() {
    try {
      const [rows] = await db.execute(`
        SELECT * FROM fishs 
        ORDER BY created_at DESC
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get ikan by ID
  static async getById(id) {
    try {
      const [rows] = await db.execute(`
        SELECT * FROM fishs 
        WHERE id = ?
      `, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Create new ikan
  static async create(ikanData) {
    try {
      const { nama, harga, satuanHarga, stok, status, deskripsi, gambar } = ikanData;
      
      const [result] = await db.execute(`
        INSERT INTO fishs (nama, harga, satuanHarga, stok, status, deskripsi, gambar, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `, [nama, harga, satuanHarga, stok, status, deskripsi, gambar || null]);
      
      // Get the created ikan
      const createdIkan = await this.getById(result.insertId);
      return createdIkan;
    } catch (error) {
      throw error;
    }
  }

  // Update ikan
  static async update(id, ikanData) {
    try {
      const { nama, harga, satuanHarga, stok, status, deskripsi, gambar } = ikanData;
      
      const [result] = await db.execute(`
        UPDATE fishs 
        SET nama = ?, harga = ?, satuanHarga = ?, stok = ?, status = ?, deskripsi = ?, gambar = ?, updated_at = NOW()
        WHERE id = ?
      `, [nama, harga, satuanHarga, stok, status, deskripsi, gambar || null, id]);
      
      if (result.affectedRows === 0) {
        throw new Error('Ikan tidak ditemukan');
      }
      
      // Get the updated ikan
      const updatedIkan = await this.getById(id);
      return updatedIkan;
    } catch (error) {
      throw error;
    }
  }

  // Delete ikan
  static async delete(id) {
    try {
      const [result] = await db.execute(`
        DELETE FROM fishs 
        WHERE id = ?
      `, [id]);
      
      if (result.affectedRows === 0) {
        throw new Error('Ikan tidak ditemukan');
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Search ikan
  static async search(searchTerm) {
    try {
      const [rows] = await db.execute(`
        SELECT * FROM fishs 
        WHERE nama LIKE ? OR deskripsi LIKE ? OR harga LIKE ?
        ORDER BY created_at DESC
      `, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get ikan by status
  static async getByStatus(status) {
    try {
      const [rows] = await db.execute(`
        SELECT * FROM fishs 
        WHERE status = ?
        ORDER BY created_at DESC
      `, [status]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Ikan;
