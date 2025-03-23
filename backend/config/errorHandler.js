/*
  ./backend/config/errorHandler.js
*/

module.exports = (err, req, res, next) => {
  console.error('Erreur interceptée :', err.stack);
  res.status(500).json({
    message: "Une erreur interne est survenue.",
    error: err.message
  });
};
