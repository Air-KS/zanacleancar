/*
  ./backend/config/passport.js
*/

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

console.log("✅ CHECK ENV VARS");
console.log("ID", process.env.GOOGLE_CLIENT_ID);
console.log("SECRET", process.env.GOOGLE_CLIENT_SECRET);
console.log("CALLBACK", process.env.GOOGLE_CALLBACK_URL);

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const userFound = await User.findOne({ where: { email: profile.emails[0].value } });

    if (userFound) return done(null, userFound);

    const randomPassword = crypto.randomBytes(12).toString('hex');
    const hashedPassword = await bcrypt.hash(randomPassword, 15);

    const newUser = await User.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      password: hashedPassword, // mot de passe bidon
    });

    return done(null, newUser);
  } catch (err) {
    console.error("Erreur stratégie Google :", err);
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
