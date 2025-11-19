const express = require("express");
const router = express.Router();
const SettingsController = require("../controllers/settingsController");
const upload = require("../middleware/upload");

// GET /api/settings - Get all settings
router.get("/", SettingsController.getAllSettings);

// GET /api/settings/website/title - Get website title only (optimized)
router.get("/website/title", async (req, res) => {
  try {
    const titleSetting = await require("../models/Settings").getByKey(
      "websiteTitle"
    );

    res.status(200).json({
      success: true,
      message: "Website title berhasil diambil",
      data: {
        websiteTitle: titleSetting
          ? titleSetting.setting_value
          : "Ikan Oni - Platform Penjualan Ikan Segar",
      },
    });
  } catch (error) {
    console.error("❌ Error getting website title:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil website title",
      data: {
        websiteTitle: "Ikan Oni - Platform Penjualan Ikan Segar",
      },
    });
  }
});

// GET /api/settings/website - Get website settings as object
router.get("/website", SettingsController.getWebsiteSettings);

// PUT /api/settings/website - Update website settings (now with file upload middleware)
router.put(
  "/website",
  upload.single("logo"), // 'logo' is the field name from FormData
  SettingsController.updateWebsiteSettings
);

// GET /api/settings/:key - Get single setting by key
router.get("/:key", SettingsController.getSettingByKey);

// PUT /api/settings/:key - Update single setting
router.put("/:key", SettingsController.updateSetting);

// DELETE /api/settings/:key - Delete setting
router.delete("/:key", SettingsController.deleteSetting);

// POST /api/settings/website/reset - Reset settings to default
router.post("/website/reset", SettingsController.resetToDefault);

module.exports = router;
