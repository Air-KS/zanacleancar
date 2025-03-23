/*
  backend/routes/authctrl.js
*/

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../models');
require('dotenv').config();

// Validation des données avec regex
const emailREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordREGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/*
=========================================
  Inscription d'un nouvel utilisateur
=========================================
*/
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    // Validation d'un email
    if (!emailREGEX.test(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    // Validation d'un Password
    if (!passwordREGEX.test(password)) {
      return res.status(400).json({
        error: "Your password must contain:\n\nAt least 8 characters,\nOne uppercase letter,\nOne lowercase letter,\nOne number,\nOne special character",
      });
    }

    // Vérification d'un utilisateur existant
    const userFound = await User.findOne({
      where: { email: email }
    });

    console.log('User found:', userFound);

    if (userFound) {
      return res.status(400).json({ error: "This email address is already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    // remplacé User.create par AuthVerify.upsert({ quand le moment sera venu d'utilisé la tab;e AuthVerify
    await User.create({
      email,
      name,
      password: hashedPassword, // Stocke le mot de passe temporairement non chiffré
      // verificationCode,
      // verificationCodeExpiry
    });
    res.status(201).json({ message: "Utilisateur inscrit avec succès." });

  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
    return res.status(500).json({ error: "Unable to add this user." });
  }
});

/*
=========================================
  Connexion de l'utilisateur
=========================================
*/
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Parameters are missing." });
    }

    // Recherche de l'utilisateur dans la base de données
    const userFound = await User.findOne({
      where: { email: email },
    });

    // Vérification si l'utilisateur existe et si le mot de passe correspond
    if (!userFound || !(await bcrypt.compare(password, userFound.password))) {
      return res.status(400).json({ error: "Email does not exist or password is incorrect." });
    }

    // Création du token JWT après une validation réussie
    const token = jwt.sign({ userId: userFound.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      userId: userFound.id,
      token: token,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur :", error);
    return res.status(500).json({ error: "Unable to log in." });
  }
});

module.exports = router;
