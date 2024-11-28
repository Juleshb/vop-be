const express = require('express');
const {
  uploadImage,
  getImages,
  getImageById,
  updateImageDetails,
  deleteImage,
} = require('../controllers/galleryController');
const { uploadGalleryImage } = require('../middleware/uploadMiddleware'); 
const router = express.Router();

router.post('/upload', uploadGalleryImage.single('image'), uploadImage);
router.get('/', getImages); 
router.get('/:gallery_id', getImageById); 
router.put('/:gallery_id', updateImageDetails);
router.delete('/:gallery_id', deleteImage); 

module.exports = router;
