const db = require("../config/database");

class Ikan {
  // Helper function to map database fields to frontend format
  static mapDatabaseToFrontend(ikan) {
    if (!ikan) return ikan;

    return {
      ...ikan,
      satuanHarga: ikan.satuan_harga || ikan.satuanHarga || "kg",
    };
  }

  // Helper function to map multiple ikan records
  static mapDatabaseToFrontendArray(ikans) {
    return ikans.map((ikan) => this.mapDatabaseToFrontend(ikan));
  }
  // Get all ikan
  static async getAll() {
    try {
      const [rows] = await db.execute(`
        SELECT * FROM fishs 
        ORDER BY created_at DESC
      `);
      return this.mapDatabaseToFrontendArray(rows);
    } catch (error) {
      throw error;
    }
  }

  // Get ikan by ID
  static async getById(id) {
    try {
      const [rows] = await db.execute(
        `
        SELECT * FROM fishs 
        WHERE id = ?
      `,
        [id]
      );
      return this.mapDatabaseToFrontend(rows[0]);
    } catch (error) {
      throw error;
    }
  }

  // Create new ikan
  static async create(ikanData) {
    try {
      const { nama, harga, satuanHarga, stok, status, deskripsi, gambar } =
        ikanData;

      const [result] = await db.execute(
        `
        INSERT INTO fishs (nama, harga, satuan_harga, stok, status, deskripsi, gambar, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `,
        [nama, harga, satuanHarga, stok, status, deskripsi, gambar || null]
      );

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
      const { nama, harga, satuanHarga, stok, status, deskripsi, gambar } =
        ikanData;

      const [result] = await db.execute(
        `
        UPDATE fishs 
        SET nama = ?, harga = ?, satuan_harga = ?, stok = ?, status = ?, deskripsi = ?, gambar = ?, updated_at = NOW()
        WHERE id = ?
      `,
        [nama, harga, satuanHarga, stok, status, deskripsi, gambar || null, id]
      );

      if (result.affectedRows === 0) {
        throw new Error("Ikan tidak ditemukan");
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
      const [result] = await db.execute(
        `
        DELETE FROM fishs 
        WHERE id = ?
      `,
        [id]
      );

      if (result.affectedRows === 0) {
        throw new Error("Ikan tidak ditemukan");
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  // Search ikan
  static async search(searchTerm) {
    try {
      const [rows] = await db.execute(
        `
        SELECT * FROM fishs 
        WHERE nama LIKE ? OR deskripsi LIKE ? OR harga LIKE ?
        ORDER BY created_at DESC
      `,
        [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
      );
      return this.mapDatabaseToFrontendArray(rows);
    } catch (error) {
      throw error;
    }
  }

  // Get ikan by status
  static async getByStatus(status) {
    try {
      const [rows] = await db.execute(
        `
        SELECT * FROM fishs 
        WHERE status = ?
        ORDER BY created_at DESC
      `,
        [status]
      );
      return this.mapDatabaseToFrontendArray(rows);
    } catch (error) {
      throw error;
    }
  }

  // Get dashboard statistics
  static async getDashboardStats() {
    try {
      // Get total count
      const [totalRows] = await db.execute(
        "SELECT COUNT(*) as total FROM fishs"
      );
      const totalIkan = totalRows[0].total;

      // Get count by status
      const [statusRows] = await db.execute(`
        SELECT status, COUNT(*) as count 
        FROM fishs 
        GROUP BY status
      `);

      // Get total value
      const [valueRows] = await db.execute(`
        SELECT SUM(harga * stok) as totalValue 
        FROM fishs
      `);
      const totalValue = valueRows[0].totalValue || 0;

      // Get category count (assuming we'll add kategori field later)
      const [categoryRows] = await db.execute(`
        SELECT COUNT(DISTINCT CASE 
          WHEN nama LIKE '%gurame%' OR nama LIKE '%lele%' OR nama LIKE '%nila%' THEN 'Air Tawar'
          WHEN nama LIKE '%bandeng%' OR nama LIKE '%kakap%' OR nama LIKE '%kerapu%' THEN 'Air Laut'
          ELSE 'Lainnya'
        END) as categoryCount
        FROM fishs
      `);
      const categoryCount = categoryRows[0].categoryCount || 0;

      // Process status counts
      const statusCounts = {
        tersedia: 0,
        habis: 0,
        "pre-order": 0,
      };

      statusRows.forEach((row) => {
        statusCounts[row.status] = row.count;
      });

      return {
        totalIkan,
        tersedia: statusCounts.tersedia,
        habis: statusCounts.habis,
        preOrder: statusCounts["pre-order"],
        totalValue,
        categoryCount,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Ikan;
