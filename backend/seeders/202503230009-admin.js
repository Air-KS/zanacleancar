'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await queryInterface.bulkInsert('Admins', [{
      name: process.env.ADMIN_FIRSTNAME,
      email: process.env.ADMIN_EMAIL,
      password: password,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', { email: process.env.ADMIN_EMAIL });
  }
};
