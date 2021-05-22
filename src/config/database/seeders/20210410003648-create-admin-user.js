'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
    {
      id: '4f006377-a49c-4434-bbde-ad7848ad43dd',
      first_name: 'Administrador',
      last_name: 'Administrador',
      email: 'admin@ioasys.com',
      telephone: '31123456789',
      password: '$2y$08$EEDkHQR4jJiCprUHUZXlHeuK3h5Hb27Lcufd5kbev/tnrjxCBZNUm',
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date(),
      is_deleted: false,
    },
  ]),

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
