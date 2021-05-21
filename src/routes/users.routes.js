// eslint-disable-next-line new-cap
const router = require('express').Router();
const { usersController, consultationsController } = require('../controllers');
const { isAuthorized, isAdmin, isSameUser } = require('../middlewares');

router.use(isAuthorized);

// List users
router.get('/', isAdmin, usersController.list);

// Profile details
router.get('/:id', isSameUser, usersController.account);

// Profile update
router.patch('/:id', isSameUser, usersController.update);

// Profile delete
router.delete('/:id', isSameUser, usersController.delete);

// Switch admin
router.post("/:id/manage", usersController.toAdmin);

// List user consultations
router.get('/:id/consultations', isSameUser, usersController.listConsultations);

// Create consultations
router.post('/:id/consultations', isSameUser, usersController.createConsultation);


module.exports.users = router;
