const db = require('../db');

exports.createAlbum = async (req, res) => {
  const { title, release_date } = req.body;
  const userId = req.user.userId;

  try {
    const [result] = await db.query(
      'INSERT INTO album (title, release_date, created_by) VALUES (?, ?, ?)',
      [title, release_date, userId]
    );
    res.status(201).json({ message: 'Album created successfully', albumId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating album', error });
  }
};

exports.getAlbums = async (req, res) => {
  try {
    const [albums] = await db.query(`
      SELECT album.album_id, album.title, album.release_date, user.username AS created_by 
      FROM album
      LEFT JOIN user ON album.created_by = user.user_id
    `);
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching albums', error });
  }
};

exports.updateAlbum = async (req, res) => {
  const { album_id, title, release_date } = req.body;

  try {
    await db.query(
      'UPDATE album SET title = ?, release_date = ? WHERE album_id = ?',
      [title, release_date, album_id]
    );
    res.json({ message: 'Album updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating album', error });
  }
};

exports.deleteAlbum = async (req, res) => {
  const { album_id } = req.body;

  try {
    await db.query('DELETE FROM album WHERE album_id = ?', [album_id]);
    res.json({ message: 'Album deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting album', error });
  }
};
