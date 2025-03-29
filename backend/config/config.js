/*
  ./backend/config/config.js
  - Fichier de configuration pour Sequelize (BDD), selon l'environnement (développement ou test)
*/

// Chargement des variables d'environnement depuis le fichier .env adapté
const path = require('path');
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? path.resolve(__dirname, '../../.env.test') : path.resolve(__dirname, '../../.env')
});

/*
=========================================
  Configuration des connexions à la base de données
  utilisée par Sequelize en dev et test
=========================================
*/
module.exports = {
  // Configuration pour l'environnement de développement
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
  // Configuration pour l'environnement de test
  test: {
    username: process.env.DB_TEST_USER,
    password: process.env.DB_TEST_PASS,
    database: process.env.DB_TEST_NAME,
    host: process.env.DB_TEST_HOST,
    dialect: 'mysql',
  },
};
