// models/AudioTrack.js

const mongoose = require('mongoose');

const audioTrackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album', // Reference to the Album model
  },
});

const AudioTrack = mongoose.model('AudioTrack', audioTrackSchema);

module.exports = AudioTrack;
