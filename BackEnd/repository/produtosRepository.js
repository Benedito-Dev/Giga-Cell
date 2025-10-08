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
        SELECT id, nome, imagemurl AS "imagemUrl", preco_unitario AS "preco", categoria, descricao, estoque
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

  async filterProducts(filtros) {
    let query = 'SELECT * FROM produtos WHERE 1=1';
    const params = [];
    let idx = 1;

    // Apenas adiciona filtros se forem válidos
    if (filtros.marca) {
      query += ` AND marca ILIKE $${idx++}`;
      params.push(`%${filtros.marca}%`);
    }

    if (filtros.cor) {
      query += ` AND cor ILIKE $${idx++}`;
      params.push(`%${filtros.cor}%`);
    }

    if (filtros.armazenamento && filtros.armazenamento !== 'Todas') {
      query += ` AND armazenamento = $${idx++}`;
      params.push(filtros.armazenamento);
    }

    if (filtros.preco) {
      const faixaPrecos = [
        { nome: 'Até R$ 500', min: 0, max: 500 },
        { nome: 'R$ 500 - R$ 1000', min: 500, max: 1000 },
        { nome: 'R$ 1000 - R$ 1500', min: 1000, max: 1500 },
        { nome: 'Acima de R$ 1500', min: 1500, max: null }
      ];

      const precoNumero = Number(filtros.preco);
      if (!isNaN(precoNumero)) {
        let condicaoPreco = '';
        for (const faixa of faixaPrecos) {
          if ((faixa.max === null && precoNumero >= faixa.min) ||
              (precoNumero >= faixa.min && precoNumero <= faixa.max)) {
            if (faixa.max === null) {
              condicaoPreco = `preco_unitario >= ${faixa.min}`;
            } else {
              condicaoPreco = `preco_unitario BETWEEN ${faixa.min} AND ${faixa.max}`;
            }
            break;
          }
        }
        if (condicaoPreco) query += ` AND (${condicaoPreco})`;
      }
    }

    // Se nenhum filtro for aplicado, a query continuará como 'SELECT * FROM produtos WHERE 1=1'
    console.log('Query final:', query);
    console.log('Params:', params);

    const result = await db.query(query, params);
    return result.rows;
  }

}

module.exports = new ProductRepository();
