// eslint-disable-next-line new-cap
const router = require('express').Router();
const { authController } = require('../controllers');
const multer = require('multer');
const uploadStorage = require('../config/upload');

const upload = multer({ storage: uploadStorage });

router.post('/signin', authController.signin);

router.post('/signup', authController.signup);

router.post('/signinpro', authController.signinPro);

router.post('/signuppro', upload.single('photo'), authController.signupPro);

module.exports.auth = router;
