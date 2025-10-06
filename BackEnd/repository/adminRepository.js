const db = require('../db/db');
const Admin = require('../models/AdminModel');

class AdminRepository {
  async findAll() {
    const result = await db.query(`
      SELECT * FROM administradores ORDER BY id_admin DESC
    `);
    return result.rows.map(row => new Admin(row));
  }

  async findById(id_admin) {
    const result = await db.query(
      `SELECT * FROM administradores WHERE id_admin = $1`,
      [id_admin]
    );
    return result.rows[0] ? new Admin(result.rows[0]) : null;
  }

  async findByEmail(email) {
    const result = await db.query(
      `SELECT * FROM administradores WHERE email = $1`,
      [email]
    );
    return result.rows[0] ? new Admin(result.rows[0]) : null;
  }

  async create(admin) {
    const result = await db.query(
      `
      INSERT INTO administradores (nome, email, senha, nivel_acesso)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        admin.nome,
        admin.email,
        admin.senha,
        admin.nivel_acesso
      ]
    );
    return new Admin(result.rows[0]);
  }

  async update(id_admin, dados) {
    const result = await db.query(
      `
      UPDATE administradores
      SET nome = $1, email = $2, nivel_acesso = $3
      WHERE id_admin = $4
      RETURNING *
      `,
      [dados.nome, dados.email, dados.nivel_acesso, id_admin]
    );
    return result.rows[0] ? new Admin(result.rows[0]) : null;
  }

  async remove(id_admin) {
    const result = await db.query(
      `DELETE FROM administradores WHERE id_admin = $1 RETURNING *`,
      [id_admin]
    );
    return result.rows[0] ? new Admin(result.rows[0]) : null;
  }
}

module.exports = new AdminRepository();
