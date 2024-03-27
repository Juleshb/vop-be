const express = require('express');
const audioTrackRouter = express.Router();
const audioTrackController = require('../controllers/audioTrackController');

// Route to create a new audio track
audioTrackRouter.post('/tracks', audioTrackController.createTrack);

// Route to update an existing audio track
audioTrackRouter.put('/tracks/:id', audioTrackController.updateTrack);

// Route to delete an audio track
audioTrackRouter.delete('/tracks/:id', audioTrackController.deleteTrack);

// Route to get a single audio track by ID
audioTrackRouter.get('/tracks/:id', audioTrackController.getTrackById);

// Route to get all audio tracks
audioTrackRouter.get('/tracks', audioTrackController.getAllTracks);

module.exports = audioTrackRouter;
