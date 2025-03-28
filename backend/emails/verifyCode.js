/*
  ./backend/emails/emailService.js
*/

const fs = require('fs').promises;
const path = require('path');
const nodemailer = require('nodemailer');

// Fonction pour envoyer un e-mail de vérification
async function sendVerificationEmail(email, code) {

  console.log('USER:', process.env.GMAIL_USER);
  console.log('PASS:', process.env.GMAIL_PASS);

  // Configuration du transporteur d'e-mail
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  // Chemin vers le template HTML
  const filePath = path.join(__dirname, 'template', 'verifyCode.html');

  try {
    // Lecture et traitement du fichier HTML
    let htmlContent = await fs.readFile(filePath, 'utf8');
    htmlContent = htmlContent.replace('{{code}}', code);

    // Options de l'email
    let mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Verification Code',
      html: htmlContent
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
  }
}

module.exports = {
  sendVerificationEmail
};
