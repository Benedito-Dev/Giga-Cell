const db = require('../db/db');
const Product = require('../models/ProdutosModel');

class ProductRepository {
  async findAll() {
    const result = await db.query(`
      SELECT 
        id, 
        nome, 
        imagemurl AS "imagemUrl", 
        preco_unitario AS "preco", 
        categoria, 
        descricao, 
        estoque
      FROM produtos
    `);
    return result.rows.map(row => new Product(row));
  }

  async findByCategory(category) {
    const result = await db.query(`
        SELECT id, nome, imagemurl AS "imagemUrl", preco_unitario, categoria, descricao, estoque
        FROM produtos
        WHERE LOWER(categoria) = LOWER($1)
    `, [category]);
    return result.rows.map(row => new Product(row));
    }

  async findById(id) {
    const result = await db.query(`
      SELECT 
        id, 
        nome, 
        imagemurl AS "imagemUrl", 
        preco_unitario AS "preco", 
        categoria, 
        descricao, 
        estoque
      FROM produtos
      WHERE id = $1
    `, [id]);

    return result.rows[0] ? new Product(result.rows[0]) : null;
  }

  async create({ id, nome, imagemUrl, preco, categoria, descricao, estoque }) {
    const result = await db.query(`
      INSERT INTO produtos (id, nome, imagemurl, preco_unitario, categoria, descricao, estoque)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING 
        id, 
        nome, 
        imagemurl AS "imagemUrl", 
        preco_unitario AS "preco", 
        categoria, 
        descricao, 
        estoque
    `, [id, nome, imagemUrl, preco, categoria, descricao, estoque || 0]);

    return new Product(result.rows[0]);
  }

  async update(id, { nome, imagemUrl, preco, categoria, descricao, estoque }) {
    const result = await db.query(`
      UPDATE produtos
      SET nome = $1, imagemurl = $2, preco_unitario = $3, categoria = $4, descricao = $5, estoque = $6
      WHERE id = $7
      RETURNING 
        id, 
        nome, 
        imagemurl AS "imagemUrl", 
        preco_unitario AS "preco", 
        categoria, 
        descricao, 
        estoque
    `, [nome, imagemUrl, preco, categoria, descricao, estoque, id]);

    return result.rows[0] ? new Product(result.rows[0]) : null;
  }

  async remove(id) {
    const result = await db.query(`
      DELETE FROM produtos
      WHERE id = $1
      RETURNING 
        id, 
        nome, 
        imagemurl AS "imagemUrl", 
        preco_unitario AS "preco", 
        categoria, 
        descricao, 
        estoque
    `, [id]);

    return result.rows[0] ? new Product(result.rows[0]) : null;
  }
}

module.exports = new ProductRepository();
