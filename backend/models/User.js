/*
  ./backend/models/User.js
*/

'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    loyalty_points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    imgprofile: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'Users',
    underscored: true,
    timestamps: true,
  });

  User.associate = (models) => {
    // Déclare ici les relations FK si besoin plus tard
    // ex: User.hasMany(models.FidelityCard, { foreignKey: 'user_id' });
  };

  return User;
};
