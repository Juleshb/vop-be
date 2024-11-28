const db = require('../db');

exports.uploadImage = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  
    const filePath = `/uploads/images/${req.file.filename}`;
    const { associated_album } = req.body;
    const userId = req.user.userId;
  
    try {
      const [result] = await db.query(
        'INSERT INTO images (file_path, uploaded_by, associated_album) VALUES (?, ?, ?)',
        [filePath, userId, associated_album]
      );
      res.status(201).json({ message: 'Image uploaded successfully', imageId: result.insertId });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading image', error });
    }
  };

exports.getImages = async (req, res) => {
  try {
    const [images] = await db.query(`
      SELECT images.image_id, images.file_path, images.uploaded_by, album.title AS album_title 
      FROM images
      LEFT JOIN album ON images.associated_album = album.album_id
    `);
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error });
  }
};
