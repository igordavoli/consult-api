const { request } = require('express')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '..', 'uploads'),
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  }
});

module.exports = storage

