/*
  ./backend/emails/passwordReset.js
*/

const fs = require('fs').promises;
const path = require('path');
const nodemailer = require('nodemailer');

// Fonction pour échapper les caractères HTML
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Fonction pour envoyer un e-mail de réinitialisation de mot de passe
async function sendPasswordResetEmail(email, resetLink, firstName) {
  if (!email || !resetLink || !firstName) {
    throw new Error('Missing required parameters');
  }

  if (!isValidEmail(email)) {
    throw new Error('Invalid email format');
  }
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  try {
    const filePath = path.join(__dirname, 'template', 'passwordReset.html');
    let htmlContent = await fs.readFile(filePath, 'utf8');

    const safeFirstName = escapeHtml(firstName);
    const safeResetLink = escapeHtml(resetLink);

    htmlContent = htmlContent
      .replace('{{firstName}}', safeFirstName)
      .replace('{{resetLink}}', safeResetLink);

    const mailOptions = {
      from: {
        name: 'Atelier ProCraft',
        address: process.env.GMAIL_USER
      },
      to: email,
      subject: 'Réinitialisation de mot de passe',
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw new Error('Failed to send password reset email');
  }
}

// Exporter la fonction
module.exports = {
  sendPasswordResetEmail
};