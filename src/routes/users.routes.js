const router = require('express').Router();
const { usersController, consultationsController } = require('../controllers');
const { isAuthorized, isAdmin, isSameUser } = require('../middlewares');

router.use(isAuthorized);

router.get('/', isAdmin, usersController.list);

router.get('/:id', isSameUser, usersController.account);

router.patch('/:id', isSameUser, usersController.update);

router.delete('/:id', isSameUser, usersController.delete);

router.post("/:id/manage", usersController.toAdmin);

router.get('/:id/consultations', isSameUser, consultationsController.list);

router.post('/:id/consultations', isSameUser, consultationsController.create);

router.post('/:id/consultations/:consultationId/cancellation', isSameUser, consultationsController.cancelate);

router.post('/:id/consultations/:consultationId/evaluation', isSameUser, consultationsController.avaliate);


module.exports.users = router;
