/*
  ./backend/config/config.js
*/

const path = require('path');
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? path.resolve(__dirname, '../../.env.test') : path.resolve(__dirname, '../../.env')
});

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 60000
    },
  },
  test: {
    username: process.env.DB_TEST_USER,
    password: process.env.DB_TEST_PASS,
    database: process.env.DB_TEST_NAME,
    host: process.env.DB_TEST_HOST,
    dialect: 'mysql',
  },
};
