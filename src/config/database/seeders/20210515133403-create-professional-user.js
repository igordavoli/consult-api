'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface
    .bulkInsert('professionals', [
      {
        id: '82409d97-6e54-4881-a5e5-5021f97ac21e',
        name: 'Professional',
        email: 'professional@ioasys.com',
        password:
          '$2y$08$EEDkHQR4jJiCprUHUZXlHeuK3h5Hb27Lcufd5kbev/tnrjxCBZNUm',
        professional_field: 'Psychologist',
        biography: 'Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mim que vai caçá sua turmis! Copo furadis é disculpa de bebadis, arcu quam euismod magna. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis!',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
        is_deleted: false,
      },
    ]),

  down: async (queryInterface, Sequelize) => queryInterface
    .bulkDelete('professionals', null, {}),
};
