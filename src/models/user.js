const { encryptor } = require('../helpers');
const { v4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      telephone: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: {
        type: DataTypes.BOOLEAN,
        field: 'is_admin',
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
    { tableName: 'users' },
  );

  User.associate = function (models) {
    User.hasMany(models.Consultation, { foreignKey: "user_id", as: "consultations" });
  }

  User.beforeSave(async (user, options) => {
    const password = await encryptor.hashPassword(user.password);

    if (user.changed('password')) {
      Object.assign(user, { password });
    }
    if (!user.id) {
      user.id = v4();
    }

    return user;
  });

  User.prototype.toJSON = function () {
    const user = { ...this.get() };

    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !['password'].includes(key)),
    );
  };

  return User;
};
