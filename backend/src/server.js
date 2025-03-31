/*
  backend/src/server.js
  Initialise et configure le serveur Express + middleware + routes + base de données
*/

// Importation des dépendances et configurations nécessaires au serveur
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');
const helmet = require('helmet');
const { Sequelize } = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require('../config/passport');

// Import des routes et du middleware d’erreur
const apirouter = require('../routes/apirouter').router;
const errorHandler = require('../config/errorHandler');

// Création de l’app Express et définition du port
const app = express();
const PORT = process.env.PORT || 3000;

console.log("🧠 ENV PORT =", process.env.PORT);

// Configuration de Sequelize (ORM)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});

// 🔐 Store de session (persistée en base de données)
const sessionStore = new SequelizeStore({ db: sequelize });

// ✅ Liste dynamique des domaines autorisés
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://zanacleancar.netlify.app']
  : [
      'https://zanacleancar.netlify.app',
      'http://127.0.0.1:8080',
      'http://localhost:8080'
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

  // Autorise les cookies cross-origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200
}));

// Middleware de sécurité HTTP (helmet)
app.use(helmet());
app.use(helmet({ xssFilter: false, frameguard: false }));

// Configuration de la session utilisateur
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'none'
  }
}));

// Création de la table de session si elle n’existe pas
sessionStore.sync();

// Logger de debug pour afficher les cookies et sessions
app.use((req, res, next) => {
  console.log('🔍 Cookie reçu:', req.headers.cookie);
  console.log('🔐 Session:', req.session);
  next();
});

// Initialisation de Passport.js pour la gestion des sessions
app.use(passport.initialize());
app.use(passport.session());

// Middleware de parsing du corps des requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Montage des routes API et gestion des erreurs
app.use("/api/v1", apirouter);
app.use(errorHandler);

// Route racine pour test simple
app.get('/', (req, res) => {
  res.send('Test le retour du Back');
});

// Démarrage de l'authentification via Google
app.get('/auth/google', passport.authenticate('google', {
  scope: ['openid', 'email', 'profile'],
  accessType: 'offline',
  prompt: 'consent'
}));

// Callback Google après login
app.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) {
      console.error("❌ Erreur dans /auth/google/callback :", err);
      return res.status(500).send("Erreur d'authentification");
    }

    if (!user) return res.redirect(`${allowedOrigins[0]}/login`);

    req.logIn(user, (err) => {
      if (err) return next(err);

      // 🔐 Sauvegarde manuelle de la session avant redirection
      req.session.save(() => {
        console.log("✅ Session sauvegardée manuellement après Google login !");
        return res.redirect(`${allowedOrigins[0]}/dashboard`);
      });
    });
  })(req, res, next);
});

// Dashboard protégé, accessible uniquement si authentifié
app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send('Non autorisé');
  res.send(`Bienvenue ${req.user.displayName}`);
});

// Connexion Sequelize + démarrage du serveur
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données établie (Sequelize).');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données (Sequelize) :', err);
  });

module.exports = app;
