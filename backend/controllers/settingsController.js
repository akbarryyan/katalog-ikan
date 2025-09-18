const Settings = require("../models/Settings");

class SettingsController {
  // Get all settings
  static async getAllSettings(req, res) {
    try {
      console.log("📋 Getting all settings...");

      const settings = await Settings.getAll();

      res.status(200).json({
        success: true,
        message: "Settings berhasil diambil",
        data: settings,
      });
    } catch (error) {
      console.error("❌ Error getting settings:", error);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil settings",
        error: error.message,
      });
    }
  }

  // Get website settings as object
  static async getWebsiteSettings(req, res) {
    try {
      console.log("🌐 Getting website settings...");

      const settings = await Settings.getWebsiteSettings();

      // Transform to frontend format
      const websiteSettings = {
        websiteName: settings.websiteName || "Ikan Oni",
        websiteTitle:
          settings.websiteTitle || "Ikan Oni - Platform Penjualan Ikan Segar",
        websiteDescription:
          settings.websiteDescription ||
          "Platform penjualan ikan segar terpercaya",
        primaryColor: settings.primaryColor || "#00412E",
        secondaryColor: settings.secondaryColor || "#96BF8A",
        logoUrl: settings.logoUrl || "",
        contactEmail: settings.contactEmail || "admin@ikanoni.com",
        contactPhone: settings.contactPhone || "+62 812-3456-7890",
        whatsappNumber: settings.whatsappNumber || "+62 812-3456-7890",
        address: settings.address || "Jl. Ikan Segar No. 123, Jakarta",
      };

      res.status(200).json({
        success: true,
        message: "Website settings berhasil diambil",
        data: websiteSettings,
      });
    } catch (error) {
      console.error("❌ Error getting website settings:", error);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil website settings",
        error: error.message,
      });
    }
  }

  // Update website settings
  static async updateWebsiteSettings(req, res) {
    try {
      console.log("💾 Updating website settings...");
      console.log("📊 Request body:", req.body);

      const {
        websiteName,
        websiteTitle,
        websiteDescription,
        primaryColor,
        secondaryColor,
        logoUrl,
        contactEmail,
        contactPhone,
        whatsappNumber,
        address,
      } = req.body;

      // Validate required fields
      if (!websiteName || !websiteDescription || !websiteTitle) {
        return res.status(400).json({
          success: false,
          message: "Nama website, title website, dan deskripsi harus diisi",
        });
      }

      // Prepare settings object
      const settingsObject = {
        websiteName: websiteName.trim(),
        websiteTitle: websiteTitle.trim(),
        websiteDescription: websiteDescription.trim(),
        primaryColor: primaryColor || "#00412E",
        secondaryColor: secondaryColor || "#96BF8A",
        logoUrl: logoUrl || "",
        contactEmail: contactEmail || "admin@ikanoni.com",
        contactPhone: contactPhone || "+62 812-3456-7890",
        whatsappNumber: whatsappNumber || "+62 812-3456-7890",
        address: address || "Jl. Ikan Segar No. 123, Jakarta",
      };

      // Update multiple settings
      const results = await Settings.updateMultiple(settingsObject);

      console.log("✅ Settings updated successfully:", results);

      res.status(200).json({
        success: true,
        message: "Website settings berhasil diperbarui",
        data: settingsObject,
      });
    } catch (error) {
      console.error("❌ Error updating website settings:", error);
      res.status(500).json({
        success: false,
        message: "Gagal memperbarui website settings",
        error: error.message,
      });
    }
  }

  // Get single setting by key
  static async getSettingByKey(req, res) {
    try {
      const { key } = req.params;
      console.log(`🔍 Getting setting by key: ${key}`);

      const setting = await Settings.getByKey(key);

      if (!setting) {
        return res.status(404).json({
          success: false,
          message: "Setting tidak ditemukan",
        });
      }

      res.status(200).json({
        success: true,
        message: "Setting berhasil diambil",
        data: setting,
      });
    } catch (error) {
      console.error("❌ Error getting setting by key:", error);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil setting",
        error: error.message,
      });
    }
  }

  // Update single setting
  static async updateSetting(req, res) {
    try {
      const { key } = req.params;
      const { value, description } = req.body;

      console.log(`💾 Updating setting: ${key} = ${value}`);

      if (value === undefined || value === null) {
        return res.status(400).json({
          success: false,
          message: "Value harus diisi",
        });
      }

      const result = await Settings.set(key, value, description || "");

      res.status(200).json({
        success: true,
        message: "Setting berhasil diperbarui",
        data: result,
      });
    } catch (error) {
      console.error("❌ Error updating setting:", error);
      res.status(500).json({
        success: false,
        message: "Gagal memperbarui setting",
        error: error.message,
      });
    }
  }

  // Delete setting
  static async deleteSetting(req, res) {
    try {
      const { key } = req.params;
      console.log(`🗑️ Deleting setting: ${key}`);

      const deleted = await Settings.delete(key);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Setting tidak ditemukan",
        });
      }

      res.status(200).json({
        success: true,
        message: "Setting berhasil dihapus",
      });
    } catch (error) {
      console.error("❌ Error deleting setting:", error);
      res.status(500).json({
        success: false,
        message: "Gagal menghapus setting",
        error: error.message,
      });
    }
  }

  // Reset settings to default
  static async resetToDefault(req, res) {
    try {
      console.log("🔄 Resetting settings to default...");

      const defaultSettings = {
        websiteName: "Ikan Oni",
        websiteTitle: "Ikan Oni - Platform Penjualan Ikan Segar",
        websiteDescription: "Platform penjualan ikan segar terpercaya",
        primaryColor: "#00412E",
        secondaryColor: "#96BF8A",
        logoUrl: "",
        contactEmail: "admin@ikanoni.com",
        contactPhone: "+62 812-3456-7890",
        whatsappNumber: "+62 812-3456-7890",
        address: "Jl. Ikan Segar No. 123, Jakarta",
      };

      const results = await Settings.updateMultiple(defaultSettings);

      console.log("✅ Settings reset to default:", results);

      res.status(200).json({
        success: true,
        message: "Settings berhasil direset ke default",
        data: defaultSettings,
      });
    } catch (error) {
      console.error("❌ Error resetting settings:", error);
      res.status(500).json({
        success: false,
        message: "Gagal mereset settings",
        error: error.message,
      });
    }
  }
}

module.exports = SettingsController;
