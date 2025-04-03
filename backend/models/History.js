/*
  ./backend/models/History.js
*/

'use strict';

module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'History',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  History.associate = (models) => {
    History.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return History;
};
