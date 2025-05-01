/*
  ./backend/migrations/202503230009-create-rewardsItems.js
*/

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RewardItems', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      vote_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      images: {
        type: Sequelize.JSON, // tableau d’URL d’images
        allowNull: true,
        defaultValue: [],
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
    await queryInterface.dropTable('RewardItems');
  }
};
