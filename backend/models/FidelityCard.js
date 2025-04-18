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
    card_id: {
      type: DataTypes.STRING(5),
      allowNull: false,
      unique: true,
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
    FidelityCard.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });

    FidelityCard.hasMany(models.Tampon, {
      foreignKey: 'card_id',
      onDelete: 'CASCADE',
      hooks: true // 🔥 utile si tu veux aussi supprimer les tampons liés
    });
  };

  return FidelityCard;
};
