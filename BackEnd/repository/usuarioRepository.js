const db = require('../db/db');
const bcrypt = require('bcrypt');
const Usuario = require('../models/UsuarioModel');

class UsuarioRepository {
  async findAll() {
    const result = await db.query(`
      SELECT * FROM usuarios ORDER BY data_cadastro DESC
    `);
    return result.rows.map(row => new Usuario(row));
  }

  async findById(id_usuario) {
    const result = await db.query(
      `SELECT * FROM usuarios WHERE id_usuario = $1`,
      [id_usuario]
    );
    return result.rows[0] ? new Usuario(result.rows[0]) : null;
  }

  async findByEmail(email) {
    const result = await db.query(
      `SELECT * FROM usuarios WHERE email = $1`,
      [email]
    );
    return result.rows[0] ? new Usuario(result.rows[0]) : null;
  }

  async create(usuario) {
    const result = await db.query(
      `
      INSERT INTO usuarios (id_usuario, nome, email, senha, cpf, telefone, endereco)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [
        usuario.id_usuario,
        usuario.nome,
        usuario.email,
        usuario.senha,
        usuario.cpf,
        usuario.telefone,
        usuario.endereco,
      ]
    );
    return new Usuario(result.rows[0]);
  }

  async verifyCredentials(email, senha) {
    const usuario = await this.findByEmail(email);

    if (!usuario) {
      const error = new Error('Credenciais inválidas');
      error.code = 401;
      throw error;
    }

    const senhaMatch = await bcrypt.compare(senha, usuario.senha);
    if (!senhaMatch) {
      const error = new Error('Credenciais inválidas');
      error.code = 401;
      throw error;
  }

    // Aqui não há campo "ativo" no modelo, então removemos essa verificação
    // Se futuramente você incluir ativo, pode descomentar:
    // if (usuario.ativo === false) {
    //   const error = new Error('Conta desativada');
    //   error.code = 403;
    //   throw error;
    // }

    // Retorna o objeto sem expor a senha
    return new Usuario({
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      email: usuario.email,
      senha: undefined, // remove a senha
      cpf: usuario.cpf,
      telefone: usuario.telefone,
      endereco: usuario.endereco,
      data_cadastro: usuario.data_cadastro
    });
  }

  async update(id_usuario, dados) {
    const result = await db.query(
      `
      UPDATE usuarios
      SET nome = $1, email = $2, telefone = $3, endereco = $4
      WHERE id_usuario = $5
      RETURNING *
      `,
      [dados.nome, dados.email, dados.telefone, dados.endereco, id_usuario]
    );
    return result.rows[0] ? new Usuario(result.rows[0]) : null;
  }

  async remove(id_usuario) {
    const result = await db.query(
      `DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *`,
      [id_usuario]
    );
    return result.rows[0] ? new Usuario(result.rows[0]) : null;
  }
}

module.exports = new UsuarioRepository();
