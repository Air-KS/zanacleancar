/*
  ./backend/routes/apirouter.js
  - Point d'entrée pour toutes les routes API de l'application (ici auth)
*/

// Importation
const express = require("express");
const authctrl = require('../routes/authctrl');

exports.router = (function () {
  // Création du routeur Express
  var apiRouter = express.Router();

  // Montage des routes liées à l'authentification sous /auth
  apiRouter.use('/auth', authctrl);

  return apiRouter;
})();
