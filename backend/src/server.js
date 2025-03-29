/*
  backend/src/server.js
*/

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require('mysql2');
const path = require('path');
const helmet = require('helmet');
const { Sequelize } = require('sequelize');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require('../config/passport');

const apirouter = require('../routes/apirouter').router;
const errorHandler = require('../config/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

console.log("🧠 ENV PORT =", process.env.PORT);

// ✅ Liste dynamique des domaines autorisés
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://zanacleancar.netlify.app']
  : [
      'https://zanacleancar.netlify.app',
      'http://localhost:8080',
      'http://127.0.0.1:8080'
    ];

// ✅ Middleware CORS dynamique
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`❌ Origin non autorisée : ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200
}));

// 🔒 Sécurité
app.use(helmet());
app.use(helmet({ xssFilter: false, frameguard: false }));

// ⚙️ Session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// 🔐 Auth
app.use(passport.initialize());
app.use(passport.session());

// 📦 Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 📡 Routes
app.use("/api/v1", apirouter);
app.use(errorHandler);

// 🧪 Test route
app.get('/', (req, res) => {
  res.send('Test le retour du Back');
});

// 🌐 Google Auth
app.get('/auth/google', passport.authenticate('google', {
  scope: ['openid', 'email', 'profile'],
  accessType: 'offline',
  prompt: 'consent'
}));

app.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) {
      console.error("❌ Erreur dans /auth/google/callback :", err);
      return res.status(500).send("Erreur d'authentification");
    }
    if (!user) return res.redirect(`${allowedOrigins[0]}/login`);
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect(`${allowedOrigins[0]}/dashboard`);
    });
  })(req, res, next);
});

// 🔒 Route protégée
app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send('Non autorisé');
  res.send(`Bienvenue ${req.user.displayName}`);
});

// 📦 Base de données
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
        console.log("✅ Connexion au serveur MySQL réussie !");
        app.listen(PORT, () => {
          console.log(`🚀 Serveur démarré sur port ${PORT}`);
        });
      }
    });
  }

  connectToMySQL();
}

module.exports = app;
