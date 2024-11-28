const multer = require('multer');
const path = require('path');

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/images'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

const songStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/songs'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/gallery'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const imageFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/; 
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) cb(null, true);
  else cb(new Error('Only image files are allowed!'), false);
};

const songFilter = (req, file, cb) => {
  console.log('File Info:', file); 
  const filetypes = /mp3|wav|mpeg/; 
  const extname = filetypes.test(file.originalname.toLowerCase().split('.').pop());
  const mimetype = filetypes.test(file.mimetype.toLowerCase());

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only audio files are allowed!'), false);
  }
};

const galleryFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/; 
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) cb(null, true);
  else cb(new Error('Only gallery image files are allowed!'), false);
};

const uploadImage = multer({ storage: imageStorage, fileFilter: imageFilter });
const uploadSong = multer({ storage: songStorage, fileFilter: songFilter });
const uploadGalleryImage = multer({ storage: galleryStorage, fileFilter: galleryFilter });

module.exports = { uploadImage, uploadSong, uploadGalleryImage };