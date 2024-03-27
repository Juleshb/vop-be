// models/Album.js

const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  release_date: {
    type: Date,
    required: true,
  },
  // Add any other fields or associations here
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
