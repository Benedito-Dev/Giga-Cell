const repository = require('../repository/celularesRepository');
const { ValidationError, NotFoundError, ConflictError } = require('../utils/errors');

class CelularesService {
  // Buscar todos os celulares
  static async getAll() {
    const celulares = await repository.findAll();
    return celulares;
  }

  // Buscar celular por ID
  static async getById(id) {
    if (!id || typeof id !== 'string') throw new ValidationError('ID inválido.');

    const celular = await repository.findById(id);
    if (!celular) throw new NotFoundError('Celular não encontrado.');

    return celular;
  }

  // Criar novo celular
  static async create(dados) {
    const { marca, modelo, sistema_operacional, preco, lancamento, armazenamento_gb, ram_gb } = dados;

    if (!marca || marca.trim().length < 1) throw new ValidationError('Marca inválida.');
    if (!modelo || modelo.trim().length < 1) throw new ValidationError('Modelo inválido.');
    if (!sistema_operacional || sistema_operacional.trim().length < 1) throw new ValidationError('Sistema operacional inválido.');
    if (!preco || isNaN(preco)) throw new ValidationError('Preço inválido.');
    if (!lancamento || isNaN(new Date(lancamento))) throw new ValidationError('Data de lançamento inválida.');
    if (!armazenamento_gb || isNaN(armazenamento_gb)) throw new ValidationError('Armazenamento inválido.');
    if (!ram_gb || isNaN(ram_gb)) throw new ValidationError('RAM inválida.');

    // Verificar duplicidade por marca + modelo
    const existing = await repository.findByMarcaModelo(marca, modelo);
    if (existing) throw new ConflictError('Celular com mesma marca e modelo já cadastrado.');

    const novoCelular = await repository.create(dados);
    return novoCelular;
  }

  // Atualizar celular
  static async update(id, dados) {
    if (!id || typeof id !== 'string') throw new ValidationError('ID inválido.');

    const existing = await repository.findById(id);
    if (!existing) throw new NotFoundError('Celular não encontrado.');

    // Evitar atualizar ID
    delete dados.id;

    // Se alterar marca ou modelo, verificar duplicidade
    if ((dados.marca && dados.marca !== existing.marca) || (dados.modelo && dados.modelo !== existing.modelo)) {
      const dup = await repository.findByMarcaModelo(dados.marca || existing.marca, dados.modelo || existing.modelo);
      if (dup) throw new ConflictError('Outro celular com mesma marca e modelo já existe.');
    }

    const celularAtualizado = await repository.update(id, dados);
    return celularAtualizado;
  }

  // Remover celular
  static async remove(id) {
    if (!id || typeof id !== 'string') throw new ValidationError('ID inválido.');

    const resultado = await repository.remove(id);
    if (!resultado) throw new NotFoundError('Celular não encontrado para remoção.');

    return resultado;
  }
}

module.exports = CelularesService;
