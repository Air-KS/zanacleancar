/*
  ./backend/routes/apirouter.js
*/

const express = require("express");
const authctrl = require('../routes/authctrl');

exports.router = (function () {
  // Création du routeur
  var apiRouter = express.Router();

  // Définition des routes liées à l'authentification
  apiRouter.use('/auth', authctrl); // Montage direct des routes auth

  return apiRouter;
})();
