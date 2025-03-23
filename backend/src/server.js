/*
  backend/src/server.js
*/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require('mysql2');
const path = require('path');
const helmet = require('helmet');
const { Sequelize } = require('sequelize');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const apirouter = require('../routes/apirouter').router;
const errorHandler = require('../config/errorHandler');

const app = express();
const PORT = process.env.PORT_BACKEND;

// Utiliser la variable d'environnement pour l'URL de back-end
const frontEndURL = process.env.VUE_NETLIFY;
const backEndURL = process.env.VITE_API_URL || 'default_value';

// Configuration de Sequelize uniquement si l'environnement n'est pas en test
let sequelize;
if (process.env.NODE_ENV !== 'test') {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false
  });

  sequelize.authenticate()
    .then(() => {
      console.log('Connexion à la base de données établie (Sequelize).');
    })
    .catch(err => {
      console.error('Erreur de connexion à la base de données (Sequelize) :', err);
    });

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  function connectToMySQL() {
    connection.connect((err) => {
      if (err) {
        console.error("Erreur de connexion au serveur MySQL :", err);
        setTimeout(connectToMySQL, 5000);
      } else {
        console.log("Connexion au serveur MySQL réussie !");
        app.listen(PORT, () => {
          console.log(`Serveur démarré sur ${backEndURL}`);
        });
      }
    });
  }

  connectToMySQL();
}

// Sécuriser les en-têtes HTTP
app.use(helmet());
app.use(helmet({
  xssFilter: false,
  frameguard: false // Désactiver X-Frame-Options
}));

// Activer CORS
app.use(cors({
  origin: frontEndURL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Parser les corps de requête
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utiliser le routeur API
app.use("/api/v1", apirouter);
app.use(errorHandler);

// Route de base
app.get('/', (req, res) => {
  res.send('Test le retour du Back');
});

// Exporter l'application pour supertest
module.exports = app;
