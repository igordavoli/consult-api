// eslint-disable-next-line new-cap
const router = require('express').Router();
const { usersController } = require('../controllers');
const { isAuthorized, isAdmin, isSameUser } = require('../middlewares');

router.use(isAuthorized);

// Profile details
router.get('/:id', isSameUser, usersController.account);

// Profile update
router.patch('/:id', isSameUser, usersController.update);

// Profile delete
router.delete('/:id', isSameUser, usersController.delete);

// List users
router.get('/', usersController.list);

// router.patch("/:id/manage", usersController.toAdmin);

module.exports.users = router;
