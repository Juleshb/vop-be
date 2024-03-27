const { Album } = require('../models');

const createAlbum = async (req, res) => {
  try {
    const { title, artist, release_date } = req.body;
    const album = await Album.create({
      title,
      artist,
      release_date
    });
    res.status(201).json({
      success: true,
      message: 'Album created successfully',
      data: album
    });
  } catch (error) {
    console.error('Error creating album:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create album',
      error: error.message
    });
  }
};

const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, release_date } = req.body;
    const [updated] = await Album.update({
      title,
      artist,
      release_date
    }, {
      where: { id }
    });
    if (updated) {
      res.status(200).json({
        success: true,
        message: 'Album updated successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Album not found'
      });
    }
  } catch (error) {
    console.error('Error updating album:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update album',
      error: error.message
    });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Album.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(200).json({
        success: true,
        message: 'Album deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Album not found'
      });
    }
  } catch (error) {
    console.error('Error deleting album:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete album',
      error: error.message
    });
  }
};

const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findOne({
      where: { id }
    });
    if (album) {
      res.status(200).json({
        success: true,
        data: album
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Album not found'
      });
    }
  } catch (error) {
    console.error('Error fetching album:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch album',
      error: error.message
    });
  }
};

const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll();
    res.status(200).json({
      success: true,
      data: albums
    });
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch albums',
      error: error.message
    });
  }
};

module.exports = {
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbumById,
  getAllAlbums
};
