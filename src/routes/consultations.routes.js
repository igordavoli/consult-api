// eslint-disable-next-line new-cap
const router = require('express').Router();
const { consultationsController } = require('../controllers');
const { isAuthorized, isSameUser } = require('../middlewares');

router.use(isAuthorized);

// List consultations
router.get('/', consultationsController.list);

// Create consultations
router.post('/:userId', consultationsController.create);

module.exports.consultations = router;