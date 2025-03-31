/*
  ./backend/routes/apirouter.js
  - Point d'entrée pour toutes les routes API de l'application (ici auth)
*/

// Importation
const express = require("express");
const authctrl = require('../routes/authctrl');
const userctrl = require('../routes/userctrl');

exports.router = (function () {
  // Création du routeur Express
  var apiRouter = express.Router();

  // Montage des routes liées à l'authentification sous /auth
  apiRouter.use('/auth', authctrl);
  apiRouter.use('/user', userctrl);

  return apiRouter;
})();
