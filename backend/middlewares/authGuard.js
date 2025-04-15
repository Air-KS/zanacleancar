/*
  ./backend/middlewares/authGuard.js
*/

const { User } = require('../models');
const { getUserid } = require('../src/jwt');

module.exports = async function authGuard(req, res, next) {
  try {
    // ✅ Session via cookie (Passport)
    if (req.isAuthenticated && req.isAuthenticated()) {
      return next();
    }

    // ✅ Fallback iOS : JWT dans les headers
    const token = req.headers.authorization;
    if (token) {
      const userId = getUserid(token);
      const user = await User.findByPk(userId);
      if (user) {
        req.user = user; // injecte manuellement l’utilisateur dans req
        return next();
      }
    }

    // ❌ Aucun cookie ni token valide
    return res.status(401).json({ error: 'Non autorisé (cookie ou token manquant)' });

  } catch (error) {
    console.error('Erreur authGuard :', error.message);
    return res.status(401).json({ error: 'Accès refusé (erreur JWT ou session)' });
  }
};
