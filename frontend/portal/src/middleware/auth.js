/*
  ./frontend/src/middleware/auth.js
*/

function authGuard(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Non autorisé. Veuillez vous connecter.' });
}

module.exports = authGuard;
