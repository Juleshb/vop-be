const db = require('../db');
const fs = require('fs'); 
const path = require('path');

exports.uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const filePath = `/uploads/gallery/${req.file.filename}`;
  const { description } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO gallery (file_path, description) VALUES (?, ?)',
      [filePath, description]
    );
    res.status(201).json({
      message: 'Gallery image uploaded successfully',
      galleryId: result.insertId,
      filePath,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Error uploading image', error });
  }
};

exports.getImages = async (req, res) => {
  try {
    const [images] = await db.query('SELECT * FROM gallery');
    res.json(images);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    res.status(500).json({ message: 'Error fetching gallery images', error });
  }
};

exports.getImageById = async (req, res) => {
  const { gallery_id } = req.params;

  try {
    const [images] = await db.query('SELECT * FROM gallery WHERE gallery_id = ?', [gallery_id]);

    if (images.length === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json(images[0]);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ message: 'Error fetching image', error });
  }
};

exports.updateImageDetails = async (req, res) => {
  const { gallery_id } = req.params;
  const { description } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE gallery SET description = ? WHERE gallery_id = ?',
      [description, gallery_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json({ message: 'Image details updated successfully' });
  } catch (error) {
    console.error('Error updating image details:', error);
    res.status(500).json({ message: 'Error updating image details', error });
  }
};

exports.deleteImage = async (req, res) => {
  const { gallery_id } = req.params;

  try {
    const [rows] = await db.query('SELECT file_path FROM gallery WHERE gallery_id = ?', [gallery_id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const filePath = path.join(__dirname, '../..', rows[0].file_path);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      }
    });

    await db.query('DELETE FROM gallery WHERE gallery_id = ?', [gallery_id]);

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Error deleting image', error });
  }
};
