'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await queryInterface.bulkInsert('Users', [{
      name: process.env.ADMIN_FIRSTNAME,
      last_name: process.env.ADMIN_LASTNAME,
      email: process.env.ADMIN_EMAIL, // ou ADMIN_MAIL selon ton .env
      password: password,
      auth_provider: 'Local',
      date_of_birth: '1990-01-01',
      phone: '0000000000',
      loyalty_points: 0,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: process.env.ADMIN_EMAIL });
  }
};
