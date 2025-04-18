/*
  ./backend/models/User.js
  Modèle Sequelize pour les utilisateurs
*/

'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    auth_provider: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'Local',
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    loyalty_points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, {
    tableName: 'Users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  User.associate = (models) => {
    User.hasOne(models.FidelityCard, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      hooks: true // 🔥 nécessaire pour que Sequelize exécute le CASCADE
    });
  };

  return User;
};
