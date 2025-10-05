const db = require('../db/db');
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
