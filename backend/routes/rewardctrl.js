/*
  backend/routes/rewardctrl.js
  Gère toutes les récompenses
*/

const express = require('express');
const router = express.Router();
const { RewardItem } = require('../models');
const adminAuth = require('../middlewares/admin');

router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, description, price, stock, images } = req.body;

    const reward = await RewardItem.create({
      name,
      description,
      price,
      stock,
      images: images || []
    });

    res.status(201).json(reward);
  } catch (error) {
    console.error("❌ Erreur création récompense :", error);
    res.status(500).json({ error: "Erreur création récompense." });
  }
});

// Récupère toutes les récompenses
router.get('/', async (req, res) => {
  try {
    const rewards = await RewardItem.findAll({
      order: [['created_at', 'DESC']] // optionnel : les plus récentes en premier
    });

    res.status(200).json(rewards);
  } catch (error) {
    console.error("❌ Erreur récupération récompenses :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des récompenses." });
  }
});

// Modifier une récompense
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { name, description, price, stock, images } = req.body;
    const reward = await RewardItem.findByPk(req.params.id);

    if (!reward) return res.status(404).json({ error: "Récompense introuvable" });

    await reward.update({
      name,
      description,
      price,
      stock,
      images: images || []
    });

    res.status(200).json(reward);
  } catch (err) {
    console.error("❌ Erreur modification :", err);
    res.status(500).json({ error: "Erreur modification" });
  }
});

// Supprimer une récompense
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const reward = await RewardItem.findByPk(req.params.id);
    if (!reward) return res.status(404).json({ error: "Récompense introuvable" });

    await reward.destroy();
    res.status(200).json({ message: "Récompense supprimée avec succès" });
  } catch (err) {
    console.error("❌ Erreur suppression :", err);
    res.status(500).json({ error: "Erreur suppression" });
  }
});
module.exports = router;
