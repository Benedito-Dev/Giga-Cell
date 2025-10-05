const bcrypt = require('bcrypt');
const crypto = require('crypto');

class Usuario {
  constructor({
    id_usuario,
    nome,
    email,
    senha,
    cpf,
    telefone,
    endereco,
    data_cadastro
  }) {
    this.id_usuario = id_usuario;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.cpf = cpf;
    this.telefone = telefone;
    this.endereco = endereco;
    this.data_cadastro = data_cadastro;
  }

  toJSON() {
    return {
      id_usuario: this.id_usuario,
      nome: this.nome,
      email: this.email,
      cpf: this.cpf,
      telefone: this.telefone,
      endereco: this.endereco,
      data_cadastro: this.data_cadastro,
    };
  }
  
  // Retorno especial para o GET /id -> inclui senha criptografada
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

  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password) {
    return await bcrypt.compare(password, this.senha);
  }
}

module.exports = Usuario;
