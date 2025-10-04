const db = require('../db/db');

class AcessorioRepository {
  // Buscar todos os acessórios
  async findAll() {
    const result = await db.query(`
      SELECT * FROM acessorios
    `);
    return result.rows;
  }

  // Buscar acessório por ID
  async findById(id) {
    const result = await db.query(`
      SELECT * FROM acessorios WHERE id = $1
    `, [id]);

    return result.rows[0] || null;
  }

  // Criar acessório
  async create({ id, nome, tipo, marca, compatibilidade, imagemUrl, material, cores_disponiveis, preco, estoque, garantia_meses }) {
    const result = await db.query(`
      INSERT INTO acessorios 
      (id, nome, tipo, marca, compatibilidade, imagemUrl, material, cores_disponiveis, preco, estoque, garantia_meses)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *
    `, [id, nome, tipo, marca, compatibilidade, imagemUrl, material, cores_disponiveis, preco, estoque, garantia_meses]);

    return result.rows[0];
  }

  // Atualizar acessório
  async update(id, dados) {
    const {
      nome, tipo, marca, compatibilidade, imagemUrl, material, cores_disponiveis, preco, estoque, garantia_meses
    } = dados;

    const result = await db.query(`
      UPDATE acessorios
      SET nome=$1, tipo=$2, marca=$3, compatibilidade=$4, imagemUrl=$5, material=$6, cores_disponiveis=$7, preco=$8, estoque=$9, garantia_meses=$10
      WHERE id=$11
      RETURNING *
    `, [nome, tipo, marca, compatibilidade, imagemUrl, material, cores_disponiveis, preco, estoque, garantia_meses, id]);

    return result.rows[0] || null;
  }

  // Remover acessório
  async remove(id) {
    const result = await db.query(`
      DELETE FROM acessorios WHERE id=$1 RETURNING *
    `, [id]);

    return result.rows[0] || null;
  }
}

module.exports = new AcessorioRepository();
