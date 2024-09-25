const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const authMiddleware = require('../middlewares/authMiddleware');
router.post(
  '/upload',
  authMiddleware.verifyToken,
  uploadController.uploadImage
);

module.exports = router;
