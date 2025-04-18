/*
  ./backend/config/passport.js
  - Fichier de configuration de la stratégie d'authentification Google avec Passport.js
*/

// Dépendances nécessaires pour Passport, stratégie Google...
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User, FidelityCard } = require('../models');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

/*
=========================================
  Configuration de la stratégie Google OAuth
=========================================
*/
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  // Recherche d'un utilisateur existant via son email, sinon création
  try {
    const userFound = await User.findOne({ where: { email: profile.emails[0].value } });

    if (userFound) return done(null, userFound);

    const randomPassword = crypto.randomBytes(12).toString('hex');
    const hashedPassword = await bcrypt.hash(randomPassword, 15);

    // Création d’un nouvel utilisateur avec les infos Google
    const newUser = await User.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      password: hashedPassword, // mot de passe généré (jamais utilisé)
      auth_provider: 'Google',
    });

    // Création automatique d'une carte fidélité
    await FidelityCard.create({
      user_id: newUser.id,
      card_id: Math.floor(10000 + Math.random() * 90000).toString(), // 5 chiffres aléatoires
      is_completed: false,
    });

    return done(null, newUser);
  } catch (err) {
    console.error("Erreur stratégie Google :", err);
    return done(err, null);
  }
}));

// Sérialisation / désérialisation de l'utilisateur pour la session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
