/*
  ./backend/routes/userctrl.js
  Contrôleur des utilisateurs : récupération, mise à jour, suppression, tri par auth_provider
*/

const express = require('express');
const router = express.Router();
const { User } = require('../models');
const authGuard = require('../middlewares/authGuard');

// ========================================
// Récupération du profil utilisateur
// ========================================
router.get('/profil/:id', authGuard, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Accès interdit : ce n'est pas votre profil." });
    }

    const user = await User.findOne({
      where: { id: userId },
      attributes: ['id', 'name', 'last_name', 'date_of_birth', 'email', 'phone', 'loyalty_points']
    });

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du profil :', error);
    return res.status(500).json({ error: 'Erreur serveur interne' });
  }
});

// ========================================
// Récupérer tous les utilisateurs
// ========================================
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'last_name', 'email', 'auth_provider', 'loyalty_points']
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error("Erreur récupération utilisateurs :", error);
    return res.status(500).json({ error: "Erreur serveur interne" });
  }
});

// ========================================
// Mise à jour du profil utilisateur
// ========================================
router.put('/profil/:id', authGuard, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, last_name, date_of_birth, phone, loyalty_points } = req.body;

    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Accès interdit : ce n'est pas votre profil." });
    }

    // 🔒 Email non modifiable directement pour des raisons de sécurité
    if (req.body.email) {
      return res.status(403).json({ error: 'Modification de l’email non autorisée depuis ce formulaire.' });
    }

    // Vérifier si les nouvelles données sont différentes des anciennes
    const user = await User.findByPk(userId); // Trouve l'utilisateur par ID
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable.' });
    }

    // Vérifie si les données ont changé
    if (user.name === name && user.last_name === last_name && user.date_of_birth === date_of_birth && user.phone === phone) {
      return res.status(200).json({ warning: 'Aucun changement effectué.' }); // Retourne une erreur si aucune donnée n'a changé
    }

    const [updated] = await User.update(
      { name, last_name, date_of_birth, phone, loyalty_points },
      { where: { id: userId } }
    );

    if (updated === 1) {
      return res.status(200).json({ success: true, message: 'Profile mis à jour avec succès.' });
    } else {
      return res.status(404).json({ error: 'Utilisateur introuvable ou aucune modification détectée.' });
    }
  } catch (error) {
    console.error('Erreur mise à jour profil :', error);
    return res.status(500).json({ error: 'Erreur serveur interne' });
  }
});

// ========================================
// Liste des utilisateurs par provider
// ========================================
router.get('/:provider', async (req, res) => {
  try {
    const provider = req.params.provider;

    const users = await User.findAll({
      where: { auth_provider: provider },
      attributes: ['id', 'name', 'last_name', 'email', 'auth_provider']
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Erreur récupération par provider :", error);
    return res.status(500).json({ error: "Erreur serveur interne" });
  }
});

// ========================================
// Suppression d’un utilisateur
// ========================================
router.delete('/delete/:id', authGuard, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Accès interdit : ce n'est pas votre profil." });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable." });
    }

    await user.destroy();

    return res.status(200).json({ message: "Compte utilisateur supprimé avec succès." });
  } catch (error) {
    console.error("Erreur suppression utilisateur :", error);
    return res.status(500).json({ error: "Impossible de supprimer l'utilisateur." });
  }
});

module.exports = router;
