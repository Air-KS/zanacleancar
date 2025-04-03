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
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  FidelityCard.associate = (models) => {
    FidelityCard.belongsTo(models.User, { foreignKey: 'user_id' });
    FidelityCard.hasMany(models.Tampon, { foreignKey: 'card_id' });
  };

  return FidelityCard;
};
