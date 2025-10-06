// src/services/authService.js
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const usuarioRepository = require('../../repository/usuarioRepository');

class AuthService {
  async login(email, senha) {
    try {
      // Verifica credenciais
      const usuario = await usuarioRepository.verifyCredentials(email, senha);

      // Reativa conta se estiver desativada
      if (!usuario.ativo) {
        await usuarioRepository.reativar(usuario.id);
      }

      // Gera token JWT
      const token = jwt.sign({ id: usuario.id }, authConfig.secret, { expiresIn: authConfig.expiresIn });

      return { usuario, token };
    } catch (error) {
      // Mantém código de erro caso exista, ou define 400 para outros erros
      throw error.code ? error : Object.assign(new Error(error.message), { code: 400 });
    }
  }

  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, authConfig.secret);
      const usuario = await usuarioRepository.findById(decoded.id);

      if (!usuario) throw Object.assign(new Error('Usuário não encontrado'), { code: 401 });
      if (!usuario.ativo) throw Object.assign(new Error('Conta desativada'), { code: 403 });

      return usuario;
    } catch (error) {
      throw error.code ? error : Object.assign(new Error('Token inválido'), { code: 401 });
    }
  }
}

module.exports = new AuthService();
