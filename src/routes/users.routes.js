const router = require("express").Router();
const { usersController } = require("../controllers");
const { isAuthorized, isAdmin } = require("../middlewares");

router.use(isAuthorized);

router.get("/:id", usersController.account);
router.put("/:id", usersController.update);

router.use(isAdmin);

router.get("/", isAdmin, usersController.list);
router.put("/:id/manage", usersController.toAdmin);

module.exports.users = router;
