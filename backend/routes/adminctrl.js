/*
  ./backend/routes/adminctrl.js
*/

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Admin, User, FidelityCard, Tampon } = require('../models');
const adminAuth = require('../middlewares/admin')

// Route de connexion admin
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(401).json({ message: 'Failed' });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ message: 'Failed' });

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

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid')
    res.status(200).json({ message: 'Déconnexion réussie' })
  });
});

// Route pour récupérer les utilisateurs (côté admin)
router.get('/users', adminAuth, async (req, res) => {
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

router.put('/user/:id/points', adminAuth, async (req, res) => {
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

router.post('/user/:id/tampons', adminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, { include: 'FidelityCard' });
    if (!user || !user.FidelityCard) {
      return res.status(404).json({ message: "Carte non trouvée" });
    }

    // Vérifie combien il en a déjà
    const currentCount = await Tampon.count({ where: { card_id: user.FidelityCard.id } });
    if (currentCount >= 7) {
      return res.status(400).json({ message: "Carte déjà complète" });
    }

    // Crée un tampon
    await Tampon.create({
      card_id: user.FidelityCard.id,
      date: new Date(),
      description: 'Ajout manuel par admin'
    });

    // Met à jour total_tampons
    user.FidelityCard.total_tampons = currentCount + 1;
    user.FidelityCard.is_completed = currentCount + 1 >= 7;
    await user.FidelityCard.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur ajout tampon :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.delete('/user/:id/tampons', adminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, { include: 'FidelityCard' });
    if (!user || !user.FidelityCard) {
      return res.status(404).json({ message: "Carte non trouvée" });
    }

    await Tampon.destroy({ where: { card_id: user.FidelityCard.id } });

    // Reset le total et completed
    user.FidelityCard.total_tampons = 0;
    user.FidelityCard.is_completed = false;
    await user.FidelityCard.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur reset tampons :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
