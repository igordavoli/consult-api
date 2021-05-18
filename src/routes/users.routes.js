// eslint-disable-next-line new-cap
const router = require('express').Router();
const { usersController } = require('../controllers');
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
router.patch("/:id/manage", usersController.toAdmin);

module.exports.users = router;
