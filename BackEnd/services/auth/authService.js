// src/services/authService.js
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const usuarioRepository = require('../../repository/usuarioRepository');

class AuthService {
  async login(email, senha) {
    try {
      console.log('Tentando login com:', email);

      // 1️⃣ Verifica credenciais (função deve retornar o usuário se senha e email forem válidos)
      const usuario = await usuarioRepository.verifyCredentials(email, senha);
      if (!usuario) {
        const error = new Error('Credenciais inválidas');
        error.code = 401;
        throw error;
      }

      // 2️⃣ Gera token JWT (atenção: use o mesmo campo do banco, ex: id_usuario)
      const token = jwt.sign(
        { id_usuario: usuario.id_usuario }, // use o nome do campo real
        authConfig.secret,
        { expiresIn: authConfig.expiresIn }
      );

      // 3️⃣ Retorna o usuário e o token
      return { usuario, token };

    } catch (error) {
      console.error('Erro no login:', error);
      // Mantém o code caso venha do repositório, senão define 400
      throw error.code
        ? error
        : Object.assign(new Error(error.message || 'Erro ao fazer login'), { code: 400 });
    }
  }

  async verifyToken(token) {
    try {
      // 1️⃣ Verifica e decodifica o token JWT
      const decoded = jwt.verify(token, authConfig.secret);
      console.log('decoded', decoded)

      // 2️⃣ Busca o usuário correspondente
      const usuario = await usuarioRepository.findById(decoded.id_usuario);
      if (!usuario) {
        throw Object.assign(new Error('Usuário não encontrado'), { code: 401 });
      }

      // (Opcional) Verificação de conta ativa, se tiver campo `ativo`
      if (usuario.ativo === false) {
        throw Object.assign(new Error('Conta desativada'), { code: 403 });
      }

      return usuario;
    } catch (error) {
      console.error('Erro na verificação do token:', error);
      throw error.code
        ? error
        : Object.assign(new Error('Token inválido ou expirado'), { code: 401 });
    }
  }
}

module.exports = new AuthService();
