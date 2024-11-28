const express = require('express');
const {
  createAlbum,
  getAlbums,
  updateAlbum,
  deleteAlbum,
} = require('../controllers/albumController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createAlbum);  
router.get('/', authMiddleware, getAlbums);   
router.put('/', authMiddleware, updateAlbum);  
router.delete('/', authMiddleware, deleteAlbum); 

module.exports = router;
