const router = require("express").Router();
const { usersController } = require("../controllers");
const { isAuthorized, isAdmin, isSameUser } = require("../middlewares");

router.use(isAuthorized);

// Profile details
router.get("/:id", isSameUser, usersController.account);

// Profile update
router.patch("/:id", isSameUser, usersController.update);

// Profile delete
router.delete("/:id", isSameUser, usersController.delete);

router.use(isAdmin);

// List users
router.get("/", usersController.list);

//router.patch("/:id/manage", usersController.toAdmin);

module.exports.users = router;

/*
endpoints de profissional
cadastro
login
profile details
profile update
profile delete
listar consultas agendadas da semana/mes
listar solicitações de consultas (ver se não é antes da data atual)
aceitar solicitação e buscar dados do usuário para entrar em contato
recusar solicitação
*/