// src/middleware/authMiddleware.js
const authService = require('../services/auth/authService');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token não fornecido' });

    const usuario = await authService.verifyToken(token);
    req.user = usuario;
    next();
  } catch (error) {
    res.status(error.code || 401).json({ message: error.message });
  }
};
