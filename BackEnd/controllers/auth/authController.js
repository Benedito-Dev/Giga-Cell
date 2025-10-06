// src/controllers/authController.js
const authService = require('../../services/auth/authService');

class AuthController {
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const ip = req.ip;
      const result = await authService.login(email, senha, ip);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(error.code || 500).json({ message: error.message });
    }
  }

  async me(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'Token não fornecido' });

      const usuario = await authService.verifyToken(token);
      return res.status(200).json(usuario);
    } catch (error) {
      console.error(error);
      return res.status(error.code || 500).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
