const { encryptor } = require('../helpers');
const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Professional = sequelize.define(
    'Professional',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      professionalField: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'professional_field'
      },
      isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        field: 'is_deleted',
      },
    },
    { tableName: 'professionals' },
  );


  Professional.associate = function (models) {
    Professional.hasMany(models.Consultation, { foreignKey: "Professional_id", as: "consultations" });
  }

  Professional.beforeSave(async (professional, options) => {
    const password = await encryptor.hashPassword(professional.password);

    if (professional.changed('password')) {
      Object.assign(professional, { password });
    }
    if (!professional.id) {
      professional.id = v4();
    }

    return professional;
  });

  Professional.prototype.toJSON = function () {
    const professional = { ...this.get() };

    return Object.fromEntries(
      Object.entries(professional).filter(([key]) => !['password'].includes(key)),
    );
  };

  return Professional;
};
