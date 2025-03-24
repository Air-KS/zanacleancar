/*
  ./backend/src/jwt.js
*/

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  //
  generateTokenForUser: function (userData) {
    // génération du token
    return jwt.sign(
      {
        // données encodées dans le token
        userId: userData.id,
        isAdmin: userData.isAdmin,
      },
      // clé secrète pour l'encodage
      process.env.JWT_SECRET,
      {
        // durée de validité du token
        expiresIn: "1h",
      },
    );
  },
  parseAuthorization: function (authorization) {
    // récupération du token
    return authorization != null ? authorization.replace("Bearer ", "") : null;
  },
  getUserid: function (authorization) {
    // récupération de l'ID utilisateur
    const jwttoken = module.exports.parseAuthorization(authorization);
    console.log(jwttoken);
    if (!jwttoken) {
      throw new Error("Invalid identification tokens.");
    }
    try {
      // vérification du token
      const jwtToken = jwt.verify(jwttoken, process.env.JWT_SECRET);
      if (jwtToken && jwtToken.userId) {
        // si le token est valide, on retourne l'ID utilisateur
        return jwtToken.userId;
      } else {
        // Sinon, renvoyez une erreur
        throw new Error("User ID missing in JWT token.");
      }
    } catch (err) {
      // Vérifiez si l'erreur est due à un problème de vérification
      if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        throw new Error("User token verification error.");
      }
      // Sinon, relancez l'erreur originale
      throw err;
    }
  },
  generateTemporaryToken: function (userId) {
    return jwt.sign(
      {
        userId: userId,
        // Autres données éventuelles
      },
      process.env.TEMPORARY_TOKEN_SECRET, // Clé secrète spécifique pour les tokens temporaires
      {
        expiresIn: "15m", // Durée de validité du token temporaire (30 minutes)
      },
    );
  },
  parseTemporaryToken: function (temporaryToken) {
    // récupération du token
    return temporaryToken != null
      ? temporaryToken.replace("Bearer ", "")
      : null;
  },
};
