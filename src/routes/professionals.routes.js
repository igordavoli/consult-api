// eslint-disable-next-line new-cap
const router = require('express').Router();
const { professionalsController, consultationsController } = require('../controllers');
const { isAuthorized, isSameUser } = require('../middlewares');

router.use(isAuthorized);

// List professionals
router.get('/', professionalsController.list);

// Profile details
router.get('/:id', isSameUser, professionalsController.account);

// Profile update
router.patch('/:id', isSameUser, professionalsController.update);

// Profile delete
router.delete('/:id', isSameUser, professionalsController.delete);

// Switch status
router.post('/:id/active-status', isSameUser, professionalsController.switchStatus);

// List consultations
router.get('/:id/consultations', isSameUser, consultationsController.list);

// Confirm consultation
router.post('/:id/consultations/:consultationId/confirmation', isSameUser, consultationsController.confirm);

// Recuse consultation
router.post('/:id/consultations/:consultationId/recusation', isSameUser, consultationsController.recuse);

// Conclude consultation
router.post('/:id/consultations/:consultationId/conclusion', isSameUser, consultationsController.conclude);

module.exports.professionals = router;
