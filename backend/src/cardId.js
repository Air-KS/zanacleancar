/*
  ./backend/src/cardId
*/

const { FidelityCard } = require('../models'); // adapte le chemin à ton projet

async function generateCardId() {
  const maxAttempts = 10;

  for (let i = 0; i < maxAttempts; i++) {
    const randomCode = String(Math.floor(10000 + Math.random() * 90000));

    const existingCard = await FidelityCard.findOne({ where: { card_id: randomCode } });
    if (!existingCard) return randomCode;
  }

  throw new Error("Impossible de générer un numéro de carte unique après plusieurs tentatives");
}

module.exports = { generateCardId };
