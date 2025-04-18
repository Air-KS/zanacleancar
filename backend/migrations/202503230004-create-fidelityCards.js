/*
  ./backend/migrations/202503230004-create-fidelityCards.js
*/

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FidelityCards', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE', // 🔥 très important ici
        onUpdate: 'CASCADE'
      },
      card_id: {
        type: Sequelize.STRING(5),
        unique: true,
        allowNull: false,
      },
      is_completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FidelityCards');
  }
};
