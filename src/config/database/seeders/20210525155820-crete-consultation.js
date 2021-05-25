'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface
    .bulkInsert('consultations', [
      {
        id: 'aade9ce5-a525-46c8-bb59-983f7e7672d9',
        user_id: '4f006377-a49c-4434-bbde-ad7848ad43dd',
        status: 'created',
        professional_id: '82409d97-6e54-4881-a5e5-5021f97ac21e',
        reason: 'Problems',
        updated_at: '2021-05-25T02:48:18.317Z',
        created_at: '2021-05-25T02:48:18.317Z'
      }
    ]),

  down: async (queryInterface, Sequelize) => queryInterface
    .bulkDelete('consultations', null, {}),
};

