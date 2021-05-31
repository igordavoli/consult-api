'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('consultations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      professional_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: "professionals", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      grade: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      reason: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'pending'
      },
      was_good: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      comment: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('consultations');
  }
};
