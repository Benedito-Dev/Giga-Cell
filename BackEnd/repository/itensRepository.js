const db = require('../db/db');
const { randomUUID } = require('crypto');
const Items = require('../models/ItensModel');

class ItensRepository {
  // Retorna todos os itens
  static async findAll() {
    const { rows } = await db.query('SELECT * FROM items ORDER BY nome ASC');
    return rows.map(row => new Items(row));
  }

  // Busca item por ID
  static async findById(id) {
    const { rows } = await db.query('SELECT * FROM items WHERE id = $1', [id]);
    return rows[0] ? new Items(rows[0]) : null;
  }

  // Busca todos os itens de um pedido específico
  static async findByPedidoId(pedido_id) {
    const { rows } = await db.query(
      `SELECT id, pedido_id, produto_id, quantidade, preco_unitario, subtotal, nome, image_url
       FROM items
       WHERE pedido_id = $1
       ORDER BY nome ASC`,
      [pedido_id]
    );
    return rows.map(row => new Items(row));
  }

  // Criação de novo item
  static async create({ pedido_id, produto_id, image_url, nome, quantidade, preco_unitario }) {
    const id = randomUUID();
    const query = `
      INSERT INTO items (
        id, pedido_id, produto_id, image_url, nome, quantidade, preco_unitario
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [id, pedido_id, produto_id, image_url, nome, quantidade, preco_unitario];

    const { rows } = await db.query(query, values);
    return new Items(rows[0]);
  }

  // Atualização de item
  static async update(id, { nome, quantidade, preco_unitario, image_url }) {
    const query = `
      UPDATE items
      SET nome = $1, quantidade = $2, preco_unitario = $3, image_url = $4
      WHERE id = $5
      RETURNING *;
    `;
    const values = [nome, quantidade, preco_unitario, image_url, id];

    const { rows } = await db.query(query, values);
    return rows[0] ? new Items(rows[0]) : null;
  }

  // Remoção de item
  static async remove(id) {
    const query = 'DELETE FROM items WHERE id = $1 RETURNING *';
    const { rows } = await db.query(query, [id]);
    return rows[0] ? new Items(rows[0]) : null;
  }
}

module.exports = ItensRepository;
