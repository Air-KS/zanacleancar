/*
  ./backend/routes/adminctrl.js
*/

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Admin, User, FidelityCard, Tampon } = require('../models');

// Route de connexion admin
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(401).json({ message: 'Admin non trouvé' });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ message: 'Mot de passe incorrect' });

    // ✅ Enregistre l'admin en session
    req.session.adminId = admin.id;

    res.status(200).json({
      success: true,
      admin: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    console.error("Erreur login admin:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route pour récupérer les utilisateurs (côté admin)
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: FidelityCard,
        include: Tampon,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Erreur admin users :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.put('/user/:id/points', async (req, res) => {
  const { id } = req.params
  const { loyalty_points } = req.body

  try {
    const user = await User.findByPk(id)
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" })

    user.loyalty_points = loyalty_points
    await user.save()

    res.status(200).json({ success: true, message: 'Points mis à jour' })
  } catch (error) {
    console.error("Erreur admin MAJ points :", error)
    res.status(500).json({ message: "Erreur serveur" })
  }
})

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid')
    res.status(200).json({ message: 'Déconnexion réussie' })
  });
});

module.exports = router;
