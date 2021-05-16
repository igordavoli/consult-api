// eslint-disable-next-line new-cap
const router = require('express').Router();
const { professionalsController } = require('../controllers');
const { isAuthorized, isSameUser } = require('../middlewares');

router.use(isAuthorized);

// List professionals
router.get('/', professionalsController.list);


// Profile details
router.get('/:id', isSameUser, professionalsController.account);

// Profile update
router.patch('/:id', professionalsController.update);

// Profile delete
router.delete('/:id', professionalsController.delete);


module.exports.professionals = router;
