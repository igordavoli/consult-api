// eslint-disable-next-line new-cap
const router = require('express').Router();
const { authController } = require('../controllers');

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);

module.exports.auth = router;
