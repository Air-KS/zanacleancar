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

/* test */
router.get('/test', (req, res) => {
  res.send('✅ Route test /auth/test fonctionne');
});

/*
=========================================
  Inscription d'un nouvel utilisateur
=========================================
*/
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Les champs obligatoires sont manquants." });
    }

    // Validation d'un email
    if (!emailREGEX.test(email)) {
      return res.status(400).json({ error: "E-mail invalide" });
    }

    // Validation d'un Password
    if (!passwordREGEX.test(password)) {
      return res.status(400).json({
        error: "Votre mot de passe doit contenir :\n★ Au moins 8 caractères\n★ Une lettre majuscule\n★ Une lettre minuscule\n★ Un chiffre\n★ Un caractère spécial",
      });
    }

    // Vérification d'un utilisateur existant
    const userFound = await User.findOne({
      where: { email: email }
    });

    console.log('User found:', userFound);

    if (userFound) {
      return res.status(400).json({ error: "Cette adresse e-mail est déjà utilisée." });
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
      message: "Un e-mail de vérification a été envoyé.",
      email,
      verifyCodeExpire
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
    return res.status(500).json({ error: "Impossible d'ajouter cet utilisateur." });
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
    return res.status(400).json({ error: "Les paramètres requis sont manquants." });
  }

  try {
    const authVerifyEntry = await AuthVerify.findOne({ where: { email, verifyCode: code } });
    if (!authVerifyEntry || Date.now() > authVerifyEntry.verifyCodeExpire) {
      return res.status(400).json({ error: "Code invalide ou expiré." });
    }

    const { name, password: hashedPassword } = authVerifyEntry;
    if (!name || !hashedPassword) {
      return res.status(400).json({ error: "Les informations utilisateur requises sont manquantes." });
    }

    const newUser = await User.create({ name, email, password: hashedPassword});

    await authVerifyEntry.destroy();
    const userToken = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: "Vérification réussie.", token: userToken, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
  } catch (error) {
    console.error("Erreur lors de la vérification :", error);
    return res.status(500).json({ error: "La vérification a échoué." });
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
      return res.status(400).json({ error: "Aucune inscription trouvée ou délai dépassé. Veuillez recommencer votre inscription." });
    }

    const newCode = crypto.randomInt(100000, 999999).toString(); // Nouveau code de vérification
    authVerifyEntry.verifyCode = newCode;
    authVerifyEntry.verifyCodeExpire = Date.now() + 5 * 60 * 1000; // 5 minutes
    await authVerifyEntry.save();

    await sendVerificationEmail(email, newCode);

    return res.status(200).json({ message: "Le code de vérification a été renvoyé avec succès." });
  } catch (error) {
    console.error("Erreur lors du renvoi du code :", error);
    return res.status(500).json({ error: "Impossible de renvoyer le code de vérification." });
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
      return res.status(400).json({ error: "Utilisateur introuvable." });
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
    return res.status(500).json({ error: "Impossible de terminer l'inscription." });
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
      return res.status(400).json({ error: "Les paramètres sont manquants." });
    }

    // Recherche de l'utilisateur dans la base de données
    const userFound = await User.findOne({
      where: { email: email },
    });

    // Vérification si l'utilisateur existe et si le mot de passe correspond
    if (!userFound || !(await bcrypt.compare(password, userFound.password))) {
      return res.status(400).json({ error: "L'E-mail n'existe pas ou le mot de passe est incorrect." });
    }

    // Création du token JWT après une validation réussie
    const token = jwt.sign({ userId: userFound.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      userId: userFound.id,
      token: token,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur :", error);
    return res.status(500).json({ error: "Impossible de se connecter." });
  }
});

module.exports = router;
