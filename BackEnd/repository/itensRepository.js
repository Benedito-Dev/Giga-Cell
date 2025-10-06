const db = require('../db/db');
const { randomUUID } = require('crypto');
const items = require('../models/ItensModel');

class ItensRepository {
  // Retorna todos os itens
  static async findAll() {
    const { rows } = await db.query('SELECT * FROM items ORDER BY nome ASC');
    return rows.map(row => new items(row));
  }

  // Busca items por ID
  static async findById(id) {
    const { rows } = await db.query('SELECT * FROM items WHERE id = $1', [id]);
    return rows[0] ? new items(rows[0]) : null;
  }

  // Busca todos os itens de um pedido específico
  static async findByPedidoId(pedido_id) {
    const { rows } = await db.query(
      'SELECT * FROM items WHERE pedido_id = $1 ORDER BY nome ASC',
      [pedido_id]
    );
    return rows.map(row => new items(row));
  }

  // Criação de novo items
  static async create({ pedido_id, produto_id, nome, quantidade, preco_unitario }) {
    const id = randomUUID();
    const query = `
      INSERT INTO items (
        id, pedido_id, produto_id, nome, quantidade, preco_unitario
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [id, pedido_id, produto_id, nome, quantidade, preco_unitario];

    const { rows } = await db.query(query, values);
    return new items(rows[0]);
  }

  // Atualização de items
  static async update(id, { nome, quantidade, preco_unitario }) {
    const query = `
      UPDATE items
      SET nome = $1, quantidade = $2, preco_unitario = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [nome, quantidade, preco_unitario, id];

    const { rows } = await db.query(query, values);
    return rows[0] ? new items(rows[0]) : null;
  }

  // Remoção de items
  static async remove(id) {
    const query = 'DELETE FROM items WHERE id = $1 RETURNING *';
    const { rows } = await db.query(query, [id]);
    return rows[0] ? new items(rows[0]) : null;
  }
}

module.exports = ItensRepository;
