const db = require('../db/db');
const Pedido = require('../models/PedidosModel');

class PedidoRepository {
  async findAll() {
    const result = await db.query(`
      SELECT 
        id,
        usuario_id,
        data,
        status,
        total,
        forma_pagamento
      FROM pedidos
      ORDER BY data DESC
    `);
    return result.rows.map(row => new Pedido(row));
  }

  async findById(id) {
    const result = await db.query(`
      SELECT 
        id,
        usuario_id,
        data,
        status,
        total,
        forma_pagamento
      FROM pedidos
      WHERE id = $1
    `, [id]);

    return result.rows[0] ? new Pedido(result.rows[0]) : null;
  }

  async findByUsuario(usuario_id) {
    const result = await db.query(`
      SELECT 
        id,
        usuario_id,
        data,
        status,
        total,
        forma_pagamento
      FROM pedidos
      WHERE usuario_id = $1
      ORDER BY data DESC
    `, [usuario_id]);

    return result.rows.map(row => new Pedido(row));
  }

  async create({ id, usuario_id, data, status, total, forma_pagamento }) {
    const result = await db.query(`
      INSERT INTO pedidos (id, usuario_id, data, status, total, forma_pagamento)
      VALUES ($1, $2, COALESCE($3, NOW()), COALESCE($4, 'pendente'), $5, $6)
      RETURNING 
        id,
        usuario_id,
        data,
        status,
        total,
        forma_pagamento
    `, [id, usuario_id, data, status, total, forma_pagamento]);

    return new Pedido(result.rows[0]);
  }

  async update(id, { usuario_id, data, status, total, forma_pagamento }) {
    const result = await db.query(`
      UPDATE pedidos
      SET 
        usuario_id = COALESCE($1, usuario_id),
        data = COALESCE($2, data),
        status = COALESCE($3, status),
        total = COALESCE($4, total),
        forma_pagamento = COALESCE($5, forma_pagamento)
      WHERE id = $6
      RETURNING 
        id,
        usuario_id,
        data,
        status,
        total,
        forma_pagamento
    `, [usuario_id, data, status, total, forma_pagamento, id]);

    return result.rows[0] ? new Pedido(result.rows[0]) : null;
  }

  async remove(id) {
    const result = await db.query(`
      DELETE FROM pedidos
      WHERE id = $1
      RETURNING 
        id,
        usuario_id,
        data,
        status,
        total,
        forma_pagamento
    `, [id]);

    return result.rows[0] ? new Pedido(result.rows[0]) : null;
  }
}

module.exports = new PedidoRepository();
