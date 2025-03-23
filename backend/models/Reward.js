/*
  ./backend/models/Reward.js
*/

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Reward = sequelize.define('Reward', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'Rewards',
    underscored: true,
    timestamps: true,
  });

  Reward.associate = (models) => {
    Reward.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Reward;
};
