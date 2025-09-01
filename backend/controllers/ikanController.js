const Ikan = require('../models/Ikan');

class IkanController {
  // Get all ikan
  static async getAllIkan(req, res) {
    try {
      const ikan = await Ikan.getAll();
      
      res.json({
        success: true,
        message: 'Data ikan berhasil diambil',
        data: ikan
      });
    } catch (error) {
      console.error('Error getting ikan:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil data ikan',
        error: error.message
      });
    }
  }

  // Get ikan by ID
  static async getIkanById(req, res) {
    try {
      const { id } = req.params;
      const ikan = await Ikan.getById(id);
      
      if (!ikan) {
        return res.status(404).json({
          success: false,
          message: 'Ikan tidak ditemukan'
        });
      }
      
      res.json({
        success: true,
        message: 'Data ikan berhasil diambil',
        data: ikan
      });
    } catch (error) {
      console.error('Error getting ikan by ID:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil data ikan',
        error: error.message
      });
    }
  }

  // Create new ikan
  static async createIkan(req, res) {
    try {
      const ikanData = req.body;
      
      // Validation
      if (!ikanData.nama || !ikanData.harga || !ikanData.stok || !ikanData.deskripsi) {
        return res.status(400).json({
          success: false,
          message: 'Nama, harga, stok, dan deskripsi harus diisi'
        });
      }
      
      // Validate harga
      if (isNaN(ikanData.harga) || ikanData.harga <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Harga harus berupa angka positif'
        });
      }
      
      // Validate stok
      if (isNaN(ikanData.stok) || ikanData.stok < 0) {
        return res.status(400).json({
          success: false,
          message: 'Stok harus berupa angka non-negatif'
        });
      }
      
      // Validate status
      const validStatuses = ['tersedia', 'habis', 'pre-order'];
      if (!validStatuses.includes(ikanData.status)) {
        return res.status(400).json({
          success: false,
          message: 'Status harus salah satu dari: tersedia, habis, pre-order'
        });
      }
      
      // Validate satuanHarga
      const validSatuan = ['kg', 'gram'];
      if (!validSatuan.includes(ikanData.satuanHarga)) {
        return res.status(400).json({
          success: false,
          message: 'Satuan harga harus kg atau gram'
        });
      }
      
      const createdIkan = await Ikan.create(ikanData);
      
      res.status(201).json({
        success: true,
        message: 'Ikan berhasil ditambahkan',
        data: createdIkan
      });
    } catch (error) {
      console.error('Error creating ikan:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat menambahkan ikan',
        error: error.message
      });
    }
  }

  // Update ikan
  static async updateIkan(req, res) {
    try {
      const { id } = req.params;
      const ikanData = req.body;
      
      // Check if ikan exists
      const existingIkan = await Ikan.getById(id);
      if (!existingIkan) {
        return res.status(404).json({
          success: false,
          message: 'Ikan tidak ditemukan'
        });
      }
      
      // Validation
      if (!ikanData.nama || !ikanData.harga || !ikanData.stok || !ikanData.deskripsi) {
        return res.status(400).json({
          success: false,
          message: 'Nama, harga, stok, dan deskripsi harus diisi'
        });
      }
      
      // Validate harga
      if (isNaN(ikanData.harga) || ikanData.harga <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Harga harus berupa angka positif'
        });
      }
      
      // Validate stok
      if (isNaN(ikanData.stok) || ikanData.stok < 0) {
        return res.status(400).json({
          success: false,
          message: 'Stok harus berupa angka non-negatif'
        });
      }
      
      // Validate status
      const validStatuses = ['tersedia', 'habis', 'pre-order'];
      if (!validStatuses.includes(ikanData.status)) {
        return res.status(400).json({
          success: false,
          message: 'Status harus salah satu dari: tersedia, habis, pre-order'
        });
      }
      
      // Validate satuanHarga
      const validSatuan = ['kg', 'gram'];
      if (!validSatuan.includes(ikanData.satuanHarga)) {
        return res.status(400).json({
          success: false,
          message: 'Satuan harga harus kg atau gram'
        });
      }
      
      const updatedIkan = await Ikan.update(id, ikanData);
      
      res.json({
        success: true,
        message: 'Ikan berhasil diperbarui',
        data: updatedIkan
      });
    } catch (error) {
      console.error('Error updating ikan:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat memperbarui ikan',
        error: error.message
      });
    }
  }

  // Delete ikan
  static async deleteIkan(req, res) {
    try {
      const { id } = req.params;
      
      // Check if ikan exists
      const existingIkan = await Ikan.getById(id);
      if (!existingIkan) {
        return res.status(404).json({
          success: false,
          message: 'Ikan tidak ditemukan'
        });
      }
      
      await Ikan.delete(id);
      
      res.json({
        success: true,
        message: 'Ikan berhasil dihapus'
      });
    } catch (error) {
      console.error('Error deleting ikan:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat menghapus ikan',
        error: error.message
      });
    }
  }

  // Search ikan
  static async searchIkan(req, res) {
    try {
      const { q } = req.query;
      
      if (!q) {
        return res.status(400).json({
          success: false,
          message: 'Query pencarian harus diisi'
        });
      }
      
      const ikan = await Ikan.search(q);
      
      res.json({
        success: true,
        message: 'Pencarian ikan berhasil',
        data: ikan
      });
    } catch (error) {
      console.error('Error searching ikan:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mencari ikan',
        error: error.message
      });
    }
  }

  // Get ikan by status
  static async getIkanByStatus(req, res) {
    try {
      const { status } = req.params;
      
      const validStatuses = ['tersedia', 'habis', 'pre-order'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Status harus salah satu dari: tersedia, habis, pre-order'
        });
      }
      
      const ikan = await Ikan.getByStatus(status);
      
      res.json({
        success: true,
        message: `Data ikan dengan status ${status} berhasil diambil`,
        data: ikan
      });
    } catch (error) {
      console.error('Error getting ikan by status:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil data ikan',
        error: error.message
      });
    }
  }
}

module.exports = IkanController;
