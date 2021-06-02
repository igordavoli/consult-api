const router = require('express').Router();
const { professionalsController, consultationsController } = require('../controllers');
const { isAuthorized, isSameUser } = require('../middlewares');

router.use(isAuthorized);

router.get('/', professionalsController.list);

router.get('/:id', isSameUser, professionalsController.account);

router.patch('/:id', isSameUser, professionalsController.update);

router.delete('/:id', isSameUser, professionalsController.delete);

router.post('/:id/active-status', isSameUser, professionalsController.switchProfessionalStatus);

router.get('/:id/consultations', isSameUser, consultationsController.list);

router.post('/:id/consultations/:consultationId/confirmation', isSameUser, consultationsController.confirm);

router.post('/:id/consultations/:consultationId/recusation', isSameUser, consultationsController.recuse);

router.post('/:id/consultations/:consultationId/conclusion', isSameUser, consultationsController.conclude);

router.post('/:id/consultations/:consultationId/cancellation', isSameUser, consultationsController.cancelate);

module.exports.professionals = router;
