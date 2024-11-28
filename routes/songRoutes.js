const express = require('express');
const {
  uploadSong,
  getSongs,
  updateSong,
  deleteSong,
} = require('../controllers/songController');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadSong: songUploadMiddleware } = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post('/', authMiddleware, songUploadMiddleware.single('song'), uploadSong);
router.get('/', authMiddleware, getSongs);     
router.put('/', authMiddleware, updateSong);   
router.delete('/', authMiddleware, deleteSong); 

module.exports = router;
