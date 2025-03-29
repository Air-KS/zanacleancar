/*
  ./backend/src/jwt.js
  Gère la création, la vérification et le parsing des tokens JWT (classiques et temporaires)
*/

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  // Génère un token JWT pour un utilisateur (valable 1h)
  generateTokenForUser: function (userData) {
    return jwt.sign(
      {
        userId: userData.id,
        isAdmin: userData.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
  },

  // Extrait le token JWT d'une string d'autorisation "Bearer ...", ou null si absent
  parseAuthorization: function (authorization) {
    return authorization != null ? authorization.replace("Bearer ", "") : null;
  },

  // Extrait l'ID utilisateur à partir du token JWT
  getUserid: function (authorization) {
    const jwttoken = module.exports.parseAuthorization(authorization);
    console.log(jwttoken);

    // Vérifie la présence du token
    if (!jwttoken) {
      throw new Error("Invalid identification tokens.");
    }

    // Vérifie la validité et décode le token JWT
    try {
      const jwtToken = jwt.verify(jwttoken, process.env.JWT_SECRET);

      // Retourne l'ID utilisateur si présent
      if (jwtToken && jwtToken.userId) {
        return jwtToken.userId;
      } else {
        throw new Error("User ID missing in JWT token.");
      }
    } catch (err) {
      if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        throw new Error("User token verification error.");
      }
      throw err;
    }
  },

  // Génère un token temporaire (ex: pour une vérification courte durée)
  generateTemporaryToken: function (userId) {
    return jwt.sign(
      {
        userId: userId,
      },
      process.env.TEMPORARY_TOKEN_SECRET,
      {
        expiresIn: "15m",
      },
    );
  },

  // Extrait un token temporaire depuis un header Authorization
  parseTemporaryToken: function (temporaryToken) {
    return temporaryToken != null
      ? temporaryToken.replace("Bearer ", "")
      : null;
  },
};
