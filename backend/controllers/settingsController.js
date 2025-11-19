const Settings = require("../models/Settings");
const fs = require("fs");
const path = require("path");

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
      console.log("📄 Request body (text fields):", req.body);
      console.log("🖼️ Request file (logo):", req.file);

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
      const textSettings = req.body;
      let logoPath = null;

      // Validate required fields
      if (
        !textSettings.websiteName ||
        !textSettings.websiteDescription ||
        !textSettings.websiteTitle
      ) {
        return res.status(400).json({
          success: false,
          message: "Nama website, title website, dan deskripsi harus diisi",
        });
      }

      // Prepare settings object
      // If a new logo is uploaded
      if (req.file) {
        // 1. Get the old logo path to delete it later
        const oldSettings = await Settings.getByKey("logoUrl");
        if (oldSettings && oldSettings.setting_value) {
          // Path lama relatif terhadap root backend, misal: /uploads/logos/file.png
          const oldLogoPath = path.join(
            __dirname,
            "..",
            oldSettings.setting_value
          );
          if (fs.existsSync(oldLogoPath)) {
            console.log(`🗑️ Deleting old logo: ${oldLogoPath}`);
            fs.unlinkSync(oldLogoPath);
          }
        }

        // 2. Prepare the new logo path for the database (e.g., /uploads/logos/filename.png)
        // req.file.path dari multer akan menjadi 'uploads\logos\filename.png' (di Windows)
        logoPath = `/${req.file.path.replace(/\\/g, "/")}`;
        console.log(`✨ New logo path to be saved: ${logoPath}`);
      }

      // Update multiple settings
      await Settings.updateMultiple(textSettings, logoPath);

      // Fetch the complete, updated settings from the database to send back to the client
      const updatedSettings = await Settings.getWebsiteSettings();
      console.log(
        "✅ Settings updated successfully. New data:",
        updatedSettings
      );

      res.status(200).json({
        success: true,
        message: "Website settings berhasil diperbarui",
        data: updatedSettings,
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
