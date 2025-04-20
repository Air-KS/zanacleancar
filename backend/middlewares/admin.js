/*
  ./backend/middlewares/admin.js
*/

const { Admin } = require('../models')

module.exports = async (req, res, next) => {
  try {
    const adminId = req.session?.adminId

    if (!adminId) return res.status(401).json({ message: "Non autorisé" })

    const admin = await Admin.findByPk(adminId)
    if (!admin) return res.status(403).json({ message: "Accès refusé" })

    req.admin = admin
    next()
  } catch (error) {
    console.error("Erreur auth admin :", error)
    res.status(500).json({ message: "Erreur serveur" })
  }
}
