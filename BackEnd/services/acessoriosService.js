const repository = require('../repository/acessoriosRepository');
const { ValidationError, NotFoundError } = require('../utils/errors');

class AcessorioService {
  static async getAll() {
    return await repository.findAll();
  }

  static async getById(id) {
    if (!id) throw new ValidationError('ID inválido.');
    const acessorio = await repository.findById(id);
    if (!acessorio) throw new NotFoundError('Acessório não encontrado.');
    return acessorio;
  }

  static async create(dados) {
    if (!dados.id || !dados.nome || !dados.tipo || dados.preco == null) {
      throw new ValidationError('Campos obrigatórios: id, nome, tipo, preco.');
    }
    return await repository.create(dados);
  }

  static async update(id, dados) {
    if (!id) throw new ValidationError('ID inválido.');
    const acessorioAtualizado = await repository.update(id, dados);
    if (!acessorioAtualizado) throw new NotFoundError('Acessório não encontrado.');
    return acessorioAtualizado;
  }

  static async remove(id) {
    if (!id) throw new ValidationError('ID inválido.');
    const resultado = await repository.remove(id);
    if (!resultado) throw new NotFoundError('Acessório não encontrado.');
    return resultado;
  }
}

module.exports = AcessorioService;
