/*
  ./backend/models/AuthVerify.js
*/

'use strict';

module.exports = (sequelize, DataTypes) => {
  const AuthVerify = sequelize.define('AuthVerify', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
    verifyCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    verifyCodeExpire: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'AuthVerify',
    underscored: true,
    timestamps: true,
  });

  return AuthVerify;
};
