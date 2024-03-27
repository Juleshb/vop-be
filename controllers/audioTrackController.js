const { AudioTrack } = require('../models'); // Assuming your model is named AudioTrack

// Controller function to create a new audio track
const createTrack = async (req, res) => {
  try {
    const { title, artist, duration, AlbumId } = req.body;
    const track = await AudioTrack.create({
      title,
      artist,
      duration,
      AlbumId
    });
    res.status(201).json({
      success: true,
      message: 'Track created successfully',
      data: track
    });
  } catch (error) {
    console.error('Error creating track:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create track',
      error: error.message
    });
  }
};

// Controller function to update an existing audio track
const updateTrack = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, duration, AlbumId } = req.body;
    const [updated] = await AudioTrack.update({
      title,
      artist,
      duration,
      AlbumId
    }, {
      where: { id }
    });
    if (updated) {
      res.status(200).json({
        success: true,
        message: 'Track updated successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Track not found'
      });
    }
  } catch (error) {
    console.error('Error updating track:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update track',
      error: error.message
    });
  }
};

// Controller function to delete an audio track
const deleteTrack = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AudioTrack.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(200).json({
        success: true,
        message: 'Track deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Track not found'
      });
    }
  } catch (error) {
    console.error('Error deleting track:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete track',
      error: error.message
    });
  }
};

// Controller function to select one audio track by ID
const getTrackById = async (req, res) => {
  try {
    const { id } = req.params;
    const track = await AudioTrack.findOne({
      where: { id }
    });
    if (track) {
      res.status(200).json({
        success: true,
        data: track
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Track not found'
      });
    }
  } catch (error) {
    console.error('Error fetching track:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch track',
      error: error.message
    });
  }
};

// Controller function to select all audio tracks
const getAllTracks = async (req, res) => {
  try {
    const tracks = await AudioTrack.findAll();
    res.status(200).json({
      success: true,
      data: tracks
    });
  } catch (error) {
    console.error('Error fetching tracks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tracks',
      error: error.message
    });
  }
};

module.exports = {
  createTrack,
  updateTrack,
  deleteTrack,
  getTrackById,
  getAllTracks
};
