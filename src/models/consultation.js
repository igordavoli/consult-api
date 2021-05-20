const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Consultation = sequelize.define(
    "Consultation",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      reason: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    { tableName: 'consultations' }
  );

  Consultation.associate = function (models) {
    Consultation.belongsTo(models.Consultation, { foreignKey: "professional_id", as: "professional" });
    Consultation.belongsTo(models.User, { foreignKey: "user_id", as: "user" });

    Consultation.beforeSave(async (Consultation, options) => {
      if (!Consultation.id) {
        Consultation.id = v4();
      }

      return Consultation;
    });

  };
  return Consultation;
};
