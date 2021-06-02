'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('professionals', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      professional_field: {
        allowNull: false,
        type: Sequelize.STRING
      },
      experience: {
        allowNull: false,
        type: Sequelize.STRING
      },
      biography: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      crp: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      remotely: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      photo_name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      is_deleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('professionals');
  },
};
