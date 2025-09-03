const express = require('express');
const router = express.Router();
const SettingsController = require('../controllers/settingsController');

// GET /api/settings - Get all settings
router.get('/', SettingsController.getAllSettings);

// GET /api/settings/website - Get website settings as object
router.get('/website', SettingsController.getWebsiteSettings);

// PUT /api/settings/website - Update website settings
router.put('/website', SettingsController.updateWebsiteSettings);

// GET /api/settings/:key - Get single setting by key
router.get('/:key', SettingsController.getSettingByKey);

// PUT /api/settings/:key - Update single setting
router.put('/:key', SettingsController.updateSetting);

// DELETE /api/settings/:key - Delete setting
router.delete('/:key', SettingsController.deleteSetting);

// POST /api/settings/reset - Reset settings to default
router.post('/reset', SettingsController.resetToDefault);

module.exports = router;
