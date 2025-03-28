/*
  ./backend/models/FidelityCard.js
*/

'use strict';

module.exports = (sequelize, DataTypes) => {
  const FidelityCard = sequelize.define('FidelityCard', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'FidelityCards',
    timestamps: true,
  });

  FidelityCard.associate = (models) => {
    FidelityCard.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return FidelityCard;
};
