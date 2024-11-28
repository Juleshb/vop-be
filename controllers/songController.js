const db = require('../db');
const { parseFile } = require('music-metadata'); 
const fs = require('fs');
const path = require('path');

exports.uploadSong = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const filePath = req.file.path; 
  const { title, album_id } = req.body;

  try {
    console.log('Full Path to Uploaded File:', filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ message: 'Uploaded file not found on server' });
    }

    const metadata = await parseFile(filePath);
    console.log('Extracted Metadata:', metadata);

    const durationInSeconds = metadata.format.duration;
    if (!durationInSeconds) {
      return res.status(400).json({ message: 'Unable to extract duration from audio file' });
    }

    const duration = new Date(durationInSeconds * 1000).toISOString().substr(11, 8);

    const [result] = await db.query(
      'INSERT INTO songs (title, duration, album_id, file_path) VALUES (?, ?, ?, ?)',
      [title, duration, album_id, filePath]
    );

    res.status(201).json({ message: 'Song uploaded successfully', songId: result.insertId });
  } catch (error) {
    console.error('Error Details:', error);
    res.status(500).json({ message: 'Error uploading song', error: error.message || error });
  }
};
exports.getSongs = async (req, res) => {
  try {
    const [songs] = await db.query(`
      SELECT songs.song_id, songs.title, songs.duration, songs.file_path, album.title AS album_title
      FROM songs
      LEFT JOIN album ON songs.album_id = album.album_id
    `);
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs', error });
  }
};

exports.updateSong = async (req, res) => {
  const { song_id, title, duration, file_path } = req.body;

  try {
    await db.query(
      'UPDATE songs SET title = ?, duration = ?, file_path = ? WHERE song_id = ?',
      [title, duration, file_path, song_id]
    );
    res.json({ message: 'Song updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating song', error });
  }
};

exports.deleteSong = async (req, res) => {
  const { song_id } = req.body;

  try {
    await db.query('DELETE FROM songs WHERE song_id = ?', [song_id]);
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting song', error });
  }
};
