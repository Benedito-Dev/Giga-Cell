const db = require('../db/db');

class CelularRepository {
  // Buscar todos os celulares
  async findAll() {
    const result = await db.query(`
      SELECT id, marca, modelo, sistema_operacional, preco_unitario, lancamento, armazenamento_gb, ram_gb 
      FROM celulares
    `);
    return result.rows;
  }

  // Buscar celular por ID
  async findById(id) {
    const result = await db.query(`
      SELECT id, marca, modelo, sistema_operacional, preco_unitario, lancamento, armazenamento_gb, ram_gb
      FROM celulares 
      WHERE id = $1
    `, [id]);

    return result.rows[0] || null;
  }

  // Buscar celular por marca + modelo (para evitar duplicidade)
  async findByMarcaModelo(marca, modelo) {
    const result = await db.query(`
      SELECT id, marca, modelo, sistema_operacional, preco_unitario, lancamento, armazenamento_gb, ram_gb
      FROM celulares 
      WHERE marca = $1 AND modelo = $2
    `, [marca, modelo]);

    return result.rows[0] || null;
  }

  // Criar novo celular
  async create({ marca, modelo, sistema_operacional, preco, lancamento, armazenamento_gb, ram_gb }) {
    const result = await db.query(`
      INSERT INTO celulares (marca, modelo, sistema_operacional, preco_unitario, lancamento, armazenamento_gb, ram_gb)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, marca, modelo, sistema_operacional, preco_unitario, lancamento, armazenamento_gb, ram_gb
    `, [marca, modelo, sistema_operacional, preco, lancamento, armazenamento_gb, ram_gb]);

    return result.rows[0];
  }

  // Atualizar celular
  async update(id, { marca, modelo, sistema_operacional, preco, lancamento, armazenamento_gb, ram_gb }) {
    const result = await db.query(`
      UPDATE celulares
      SET marca = $1, modelo = $2, sistema_operacional = $3, preco_unitario = $4, lancamento = $5, armazenamento_gb = $6, ram_gb = $7
      WHERE id = $8
      RETURNING id, marca, modelo, sistema_operacional, preco_unitario, lancamento, armazenamento_gb, ram_gb
    `, [marca, modelo, sistema_operacional, preco, lancamento, armazenamento_gb, ram_gb, id]);

    return result.rows[0] || null;
  }

  // Remover celular
  async remove(id) {
    const result = await db.query(`
      DELETE FROM celulares 
      WHERE id = $1 
      RETURNING id, marca, modelo, sistema_operacional, preco_unitario, lancamento, armazenamento_gb, ram_gb
    `, [id]);

    return result.rows[0] || null;
  }
}

module.exports = new CelularRepository();
