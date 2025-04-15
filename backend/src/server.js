/*
  backend/src/server.js
  Initialise et configure le serveur Express + middleware + routes + base de données
*/

// backend/src/server.js
const express = require('express');
const session = require('express-session');
const { generateTokenForUser } = require('./jwt');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');
const helmet = require('helmet');
const { Sequelize } = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require('../config/passport');

const apirouter = require('../routes/apirouter').router;
const errorHandler = require('../config/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;
app.set('trust proxy', 1);

// 🔌 Connexion DB
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false
  }
);

const sessionStore = new SequelizeStore({ db: sequelize });

// ✅ Domains autorisés
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://www.zanacleancar.fr', 'https://api.zanacleancar.fr']
  : ['http://localhost:8080', 'http://127.0.0.1:8080'];

// ✅ Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.warn(`❌ Origin non autorisée : ${origin}`);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(helmet());
app.use(helmet({ xssFilter: false, frameguard: false }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  }
}));

sessionStore.sync();

app.use((req, res, next) => {
  console.log('🔍 Cookie:', req.headers.cookie);
  console.log('🔐 Session:', req.session);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", apirouter);
app.use(errorHandler);

app.get('/', (req, res) => res.send('Backend is alive 🚀'));

app.get('/auth/google', passport.authenticate('google', {
  scope: ['openid', 'email', 'profile'],
  accessType: 'offline',
  prompt: 'consent'
}));

app.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    if (err || !user) return res.redirect(`${req.headers.origin}/login`);
    req.logIn(user, (err) => {
      if (err) return next(err);
      req.session.save(() => res.redirect(`${req.headers.origin}/`));
    });
  })(req, res, next);
});

app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send('Non autorisé');
  res.send(`Bienvenue ${req.user.displayName}`);
});

app.get('/debug-cookie', (req, res) => {
  req.session.user = { id: 999, name: 'TestCookie' };
  req.session.save(() => res.send('✅ Cookie de test généré !'));
});

app.get('/api/v1/auth/token', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Pas connecté' });

  const jwt = generateTokenForUser(req.user); // ta fonction actuelle
  res.json({ token: jwt });
});

// 🎯 Démarrage du serveur
sequelize.authenticate()
  .then(() => {
    console.log('✅ DB connectée.');
    app.listen(PORT, () => console.log(`🚀 Serveur lancé sur port ${PORT}`));
  })
  .catch(err => console.error('❌ Erreur de connexion DB:', err));

module.exports = app;
