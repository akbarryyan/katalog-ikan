const express = require('express');
const router = express.Router();
const IkanController = require('../controllers/ikanController');
const upload = require('../middleware/upload');

// GET /api/ikan - Get all ikan
router.get('/', IkanController.getAllIkan);

// GET /api/ikan/search?q=keyword - Search ikan
router.get('/search', IkanController.searchIkan);

// GET /api/ikan/status/:status - Get ikan by status
router.get('/status/:status', IkanController.getIkanByStatus);

// GET /api/ikan/:id - Get ikan by ID
router.get('/:id', IkanController.getIkanById);

// POST /api/ikan - Create new ikan
router.post('/', upload.single('gambar'), IkanController.createIkan);

// PUT /api/ikan/:id - Update ikan
router.put('/:id', upload.single('gambar'), IkanController.updateIkan);

// DELETE /api/ikan/:id - Delete ikan
router.delete('/:id', IkanController.deleteIkan);

module.exports = router;
