/*
  ./backend/models/RewardItem.js
*/

'use strict';

module.exports = (sequelize, DataTypes) => {
  const RewardItem = sequelize.define('RewardItem', {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    vote_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
  }, {
    tableName: 'RewardItems',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  RewardItem.associate = (models) => {
    // Si un jour tu veux associer avec autre chose, tu pourras le faire ici
  };

  return RewardItem;
};
