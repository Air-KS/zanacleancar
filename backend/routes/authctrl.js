/*
  backend/routes/authctrl.js
*/

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User, AuthVerify } = require('../models');
const { sendVerificationEmail } = require('../emails/verifyCode');
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

    const verifyCode = crypto.randomInt(100000, 999999).toString();
    const verifyCodeExpire = Date.now() + 5 * 60 * 1000; // 5 minutes

    const hashedPassword = await bcrypt.hash(password, 15);

    // remplacé User.create par AuthVerify.upsert({ quand le moment sera venu d'utilisé la tab;e AuthVerify
    await AuthVerify.upsert({
      email,
      name,
      password: hashedPassword, // Stocke le mot de passe temporairement non chiffré
      verifyCode,
      verifyCodeExpire
    });

    await sendVerificationEmail(email, verifyCode);

    res.status(201).json({
      message: "A verification email has been sent.",
      email,
      verifyCodeExpire
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
    return res.status(500).json({ error: "Unable to add this user." });
  }
});

/*
=========================================
  Code de Vérification
=========================================
*/
router.post('/verifyCode', async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ error: "Required parameters are missing." });
  }

  try {
    const authVerifyEntry = await AuthVerify.findOne({ where: { email, verifyCode: code } });
    if (!authVerifyEntry || Date.now() > authVerifyEntry.verifyCodeExpire) {
      return res.status(400).json({ error: "Invalid code or expired." });
    }

    const { name, password: hashedPassword } = authVerifyEntry;
    if (!name || !hashedPassword) {
      return res.status(400).json({ error: "Required user information is missing." });
    }

    const newUser = await User.create({ name, email, password: hashedPassword});

    await authVerifyEntry.destroy();
    const userToken = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: "Vérification réussie.", token: userToken, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
  } catch (error) {
    console.error("Erreur lors de la vérification :", error);
    return res.status(500).json({ error: "Verification failed." });
  }
});

/*
=========================================
  Renvoyer Code de Vérification
=========================================
*/
router.post('/resend-code', async (req, res) => {
  const { email } = req.body;

  try {
    const authVerifyEntry = await AuthVerify.findOne({ where: { email } });

    if (!authVerifyEntry) {
      return res.status(400).json({ error: "No registration process found. Please restart the process." });
    }

    const newCode = crypto.randomInt(100000, 999999).toString(); // Nouveau code de vérification
    authVerifyEntry.verifyCode = newCode;
    authVerifyEntry.verifyCodeExpire = Date.now() + 5 * 60 * 1000; // 5 minutes
    await authVerifyEntry.save();

    await sendVerificationEmail(email, newCode);

    return res.status(200).json({ message: "Verification code resent successfully." });
  } catch (error) {
    console.error("Erreur lors du renvoi du code :", error);
    return res.status(500).json({ error: "Unable to resend the verification code." });
  }
});

/*
=========================================
  Compléter l'inscription
=========================================
*/
router.post('/complete-registration', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userFound = await User.findOne({ where: { email: email } });
    if (!userFound) {
      return res.status(400).json({ error: "User not found." });
    }

    const bcryptedPassword = await bcrypt.hash(password, 5);
    userFound.password = bcryptedPassword;
    await userFound.save();

    const token = jwt.sign({ userId: userFound.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      userId: userFound.id,
      token: token,
    });
  } catch (error) {
    console.error("Erreur lors de la complétion de l'inscription :", error);
    return res.status(500).json({ error: "Unable to complete the registration." });
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
