/*
  ./backend/routes/adminctrl.js
*/

const express = require('express');
const router = express.Router();
const { User, FidelityCard, Tampon } = require('../models');

// Route sans authGuard (juste pour test)
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

// ✅ Export du router pour qu’il soit utilisable dans apirouter.js
module.exports = router;
