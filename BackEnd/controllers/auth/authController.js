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
      if (error.code === 401) {
        return res.status(401).json({ error: error.message });
      }
      if (error.code === 403) {
        return res.status(403).json({ error: error.message });
      }
      return res.status(500).json({ 
        error: 'Erro interno no servidor',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

module.exports = new AuthController();
