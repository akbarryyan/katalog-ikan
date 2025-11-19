const db = require("../config/database");

class Settings {
  // Get all settings
  static async getAll() {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM settings ORDER BY created_at DESC"
      );
      return rows;
    } catch (error) {
      console.error("Error getting settings:", error);
      throw error;
    }
  }

  // Get setting by key
  static async getByKey(key) {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM settings WHERE setting_key = ?",
        [key]
      );
      return rows[0] || null;
    } catch (error) {
      console.error("Error getting setting by key:", error);
      throw error;
    }
  }

  // Create or update setting
  static async set(key, value, description = "") {
    try {
      // Check if setting exists
      const existing = await this.getByKey(key);

      if (existing) {
        // Update existing setting
        const [result] = await db.execute(
          "UPDATE settings SET setting_value = ?, description = ?, updated_at = NOW() WHERE setting_key = ?",
          [value, description, key]
        );
        return {
          id: existing.id,
          setting_key: key,
          setting_value: value,
          description,
          updated: true,
        };
      } else {
        // Create new setting
        const [result] = await db.execute(
          "INSERT INTO settings (setting_key, setting_value, description, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
          [key, value, description]
        );
        return {
          id: result.insertId,
          setting_key: key,
          setting_value: value,
          description,
          updated: false,
        };
      }
    } catch (error) {
      console.error("Error setting value:", error);
      throw error;
    }
  }

  // Delete setting
  static async delete(key) {
    try {
      const [result] = await db.execute(
        "DELETE FROM settings WHERE setting_key = ?",
        [key]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting setting:", error);
      throw error;
    }
  }

  // Get website settings as object
  static async getWebsiteSettings() {
    try {
      const settings = await this.getAll();
      const websiteSettings = {};

      settings.forEach((setting) => {
        websiteSettings[setting.setting_key] = setting.setting_value;
      });

      return websiteSettings;
    } catch (error) {
      console.error("Error getting website settings:", error);
      throw error;
    }
  }

  // Update multiple settings at once
  static async updateMultiple(settingsObject, logoPath = null) {
    try {
      const results = [];

      // 1. Update text-based settings from the form body
      for (const [key, value] of Object.entries(settingsObject)) {
        const result = await this.set(key, value);
        results.push(result);
      }

      // 2. If a new logo was uploaded, update the logoUrl setting specifically
      if (logoPath) {
        const logoResult = await this.set("logoUrl", logoPath);
        results.push(logoResult);
      }

      return results;
    } catch (error) {
      console.error("Error updating multiple settings:", error);
      throw error;
    }
  }
}

module.exports = Settings;
