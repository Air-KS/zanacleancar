/*
  backend/routes/authctrl.js
  Gère les routes liées à l'inscription, la connexion et la vérification par email
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

// test
router.get('/test', (req, res) => {
  res.send('✅ Route test /auth/test fonctionne');
});

/*
=========================================
  Inscription d'un nouvel utilisateur
=========================================
*/
router.post('/register', async (req, res) => {
  // Traitement de l'inscription avec vérification des données
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

    // Si l'utilisateur existe déjà, on bloque l'inscription
    if (userFound) {
      return res.status(400).json({ error: "Cette adresse e-mail est déjà utilisée." });
    }

    // Génération d’un code de vérification à usage unique
    const verifyCode = crypto.randomInt(100000, 999999).toString();
    const verifyCodeExpire = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Hash du mot de passe pour stockage temporaire
    const hashedPassword = await bcrypt.hash(password, 15);

    // Création ou mise à jour dans la table temporaire AuthVerify
    await AuthVerify.upsert({
      email,
      name,
      password: hashedPassword,
      verifyCode,
      verifyCodeExpire
    });

    // Envoi de l’email de vérification
    await sendVerificationEmail(email, verifyCode);
    res.status(201).json({
      message: "Un e-mail de vérification a été envoyé.",
      email,
      verifyCodeExpire
    });

    // Fin du traitement d'inscription
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

  // Vérifie que le code est valide et non expiré
  try {
    const authVerifyEntry = await AuthVerify.findOne({ where: { email, verifyCode: code } });
    if (!authVerifyEntry || Date.now() > authVerifyEntry.verifyCodeExpire) {
      return res.status(400).json({ error: "Code invalide ou expiré." });
    }

    // Récupère les infos à transférer dans la table User
    const { name, password: hashedPassword } = authVerifyEntry;
    if (!name || !hashedPassword) {
      return res.status(400).json({ error: "Les informations utilisateur requises sont manquantes." });
    }

    // Création de l'utilisateur final dans la table User
    const newUser = await User.create({ name, email, password: hashedPassword });

    // Suppression de l'entrée temporaire
    await authVerifyEntry.destroy();

    // Génération du token JWT après vérification réussie
    const userToken = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({
      message: "Vérification réussie.",
      token: userToken,
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });

    // Fin vérification
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

  // Recherche de l’entrée temporaire pour l’utilisateur
  try {
    const authVerifyEntry = await AuthVerify.findOne({ where: { email } });

    // Vérifie si un code est encore valable
    if (!authVerifyEntry) {
      return res.status(400).json({ error: "Aucune inscription trouvée ou délai dépassé. Veuillez recommencer votre inscription." });
    }

    // Génère un nouveau code et met à jour la date d'expiration
    const newCode = crypto.randomInt(100000, 999999).toString();
    authVerifyEntry.verifyCode = newCode;
    authVerifyEntry.verifyCodeExpire = Date.now() + 5 * 60 * 1000;
    await authVerifyEntry.save();

    // Envoi du nouveau code par e-mail
    await sendVerificationEmail(email, newCode);
    return res.status(200).json({ message: "Le code de vérification a été renvoyé avec succès." });

    // Fin renvoi code
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
  // Mise à jour du mot de passe pour finaliser l'inscription
  try {
    const { name, email, password } = req.body;
    const userFound = await User.findOne({ where: { email: email } });

    // Vérifie si l'utilisateur existe
    if (!userFound) {
      return res.status(400).json({ error: "Utilisateur introuvable." });
    }

    // Hash du nouveau mot de passe et sauvegarde
    const bcryptedPassword = await bcrypt.hash(password, 5);
    userFound.password = bcryptedPassword;
    await userFound.save();

    // Génération d’un nouveau token JWT
    const token = jwt.sign({ userId: userFound.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({
      userId: userFound.id,
      token: token,
    });

    // Fin inscription complète
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
  // Vérification des identifiants de connexion
  try {
    const { email, password } = req.body;

    // Vérifie si les champs sont remplis
    if (!email || !password) {
      return res.status(400).json({ error: "Les paramètres sont manquants." });
    }

    // Recherche de l'utilisateur dans la base de données
    const userFound = await User.findOne({
      where: { email: email },
    });

    // Vérifie l'existence et la validité du mot de passe
    if (!userFound || !(await bcrypt.compare(password, userFound.password))) {
      return res.status(400).json({ error: "L'E-mail n'existe pas ou le mot de passe est incorrect." });
    }

    // Génération du token JWT
    const token = jwt.sign({ userId: userFound.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({
      userId: userFound.id,
      token: token,
    });

    // Fin login
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur :", error);
    return res.status(500).json({ error: "Impossible de se connecter." });
  }
});

module.exports = router;
