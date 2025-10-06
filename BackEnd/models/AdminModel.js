const bcrypt = require('bcrypt');
const crypto = require('crypto');

class Admin {
  constructor({
    id_admin,
    nome,
    email,
    senha,
    nivel_acesso
  }) {
    this.id_admin = id_admin;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.nivel_acesso = nivel_acesso;
  }

  // Representação básica do Admin (sem senha)
  toJSON() {
    return {
      id_admin: this.id_admin,
      nome: this.nome,
      email: this.email,
      nivel_acesso: this.nivel_acesso,
    };
  }
  
  // Retorno especial para GET /id -> inclui senha criptografada
  toJSONWithEncryptedSenha(secret) {
    const base = this.toJSON();
    const key = secret || process.env.SHOW_PASS_SECRET || 'fallback-secret';

    let senhaCriptografada = null;
    if (this.senha) {
      senhaCriptografada = crypto
        .createHmac('sha256', key)
        .update(String(this.senha))
        .digest('hex');
    }

    return {
      ...base,
      senha: senhaCriptografada
    };
  }

  // Método estático para hash de senha
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  // Método para comparar senha fornecida com a armazenada
  async comparePassword(password) {
    return await bcrypt.compare(password, this.senha);
  }
}

module.exports = Admin;
