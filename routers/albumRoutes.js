const express = require('express');
const albumrouter = express.Router();
const albumController = require('../controllers/albumController');

// Route to create a new album
albumrouter.post('/albums', albumController.createAlbum);

// Route to update an existing album
albumrouter.put('/albums/:id', albumController.updateAlbum);

// Route to delete an album
albumrouter.delete('/albums/:id', albumController.deleteAlbum);

// Route to get a single album by ID
albumrouter.get('/albums/:id', albumController.getAlbumById);

// Route to get all albums
albumrouter.get('/albums', albumController.getAllAlbums);

module.exports = albumrouter;
