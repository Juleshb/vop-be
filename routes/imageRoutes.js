const express = require('express');
const { uploadImage, getImages } = require('../controllers/imageController');
const { uploadImage: imageUploadMiddleware } = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, imageUploadMiddleware.single('image'), uploadImage);
router.get('/', authMiddleware, getImages);  

module.exports = router;
