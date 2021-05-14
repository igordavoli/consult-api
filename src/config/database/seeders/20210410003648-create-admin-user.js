"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        id: "4f006377-a49c-4434-bbde-ad7848ad43dd",
        name: "Administrador",
        email: "admin@ioasys.com",
        password:
          "$2y$08$EEDkHQR4jJiCprUHUZXlHeuK3h5Hb27Lcufd5kbev/tnrjxCBZNUm",
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
        is_deleted: false,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
