/*
  ./backend/models/Tampon.js
*/

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Tampon = sequelize.define('Tampon', {
    card_id: {
      type: DataTypes.INTEGER,
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
    tableName: 'Tampons',
    timestamps: true,
  });

  Tampon.associate = (models) => {
    Tampon.belongsTo(models.FidelityCard, { foreignKey: 'card_id' });
  };

  return Tampon;
};
