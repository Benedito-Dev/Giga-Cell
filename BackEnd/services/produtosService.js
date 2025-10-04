const repository = require('../repository/produtosRepository');
const { ValidationError, NotFoundError } = require('../utils/errors');

class ProductService {
  static async getAll() {
    return await repository.findAll();
  }

  static async findByCategory(category) {
    return await repository.findByCategory(category)
  }

  static async getById(id) {
    if (!id) throw new ValidationError('ID inválido.');
    const product = await repository.findById(id);
    if (!product) throw new NotFoundError('Produto não encontrado.');
    return product;
  }

  static async create(data) {
    if (!data.id || !data.nome || !data.preco || !data.categoria) {
      throw new ValidationError('Campos obrigatórios: id, nome, preco, categoria.');
    }
    return await repository.create(data);
  }

  static async update(id, data) {
    const updated = await repository.update(id, data);
    if (!updated) throw new NotFoundError('Produto não encontrado para atualizar.');
    return updated;
  }

  static async remove(id) {
    const removed = await repository.remove(id);
    if (!removed) throw new NotFoundError('Produto não encontrado para remover.');
    return removed;
  }
}

module.exports = ProductService;
