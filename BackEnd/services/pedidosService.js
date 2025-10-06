const repository = require('../repository/pedidosRepository');
const { ValidationError, NotFoundError } = require('../utils/errors');

class ProductService {
  static async getAll() {
    return await repository.findAll();
  }

  static async getByUsuario(id_usuario) {
    return await repository.findByUsuario(id_usuario)
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
