'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface
    .bulkInsert('professionals', [
      {
        id: '82409d97-6e54-4881-a5e5-5021f97ac21e',
        first_name: 'John',
        last_name: 'Lee',
        email: 'johnlee@psychologist.com',
        password: '$2y$08$EEDkHQR4jJiCprUHUZXlHeuK3h5Hb27Lcufd5kbev/tnrjxCBZNUm',
        professional_field: 'Psychologist',
        experience: 'Mussum Ipsum, cacilds vidis litro abertis. Interagi no mé, cursus quis, vehicula ac nisi. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Atirei o pau no gatis, per gatis num morreus.',
        biography: 'Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mim que vai caçá sua turmis! Copo furadis é disculpa de bebadis, arcu quam euismod magna. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis!',
        photo_name: null,
        crp: '1234567890',
        is_active: true,
        city: 'São Paulo',
        remotely: true,
        created_at: new Date(),
        updated_at: new Date(),
        is_deleted: false,
      },
    ]),

  down: async (queryInterface, Sequelize) => queryInterface
    .bulkDelete('professionals', null, {}),
};
