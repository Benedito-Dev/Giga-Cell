const ItensRepository = require('../repository/itensRepository');
const { ValidationError, NotFoundError } = require('../utils/errors');
const db = require('../db/db');

class ItensService {
  // Lista todos os itens
  static async getAll() {
    const itens = await ItensRepository.findAll();
    return itens;
  }

  // Busca um item por ID
  static async getById(id) {
    const item = await ItensRepository.findById(id);
    if (!item) throw new NotFoundError('Item não encontrado');
    return item;
  }

  // Busca itens de um pedido específico
  static async getByPedidoId(pedido_id) {
    const itens = await ItensRepository.findByPedidoId(pedido_id);
    return itens;
  }

  // Criação de item
  static async create(data) {
    const { pedido_id, produto_id, nome, quantidade, preco_unitario } = data;

    // Validação básica
    if (!pedido_id || !produto_id || !nome)
      throw new ValidationError('Campos obrigatórios ausentes');

    if (!quantidade || quantidade <= 0)
      throw new ValidationError('A quantidade deve ser maior que zero');

    if (!preco_unitario || preco_unitario <= 0)
      throw new ValidationError('O preço unitário deve ser maior que zero');

    // Validação de existência do pedido e produto
    const pedidoExists = await db.query('SELECT id FROM pedidos WHERE id = $1', [pedido_id]);
    if (pedidoExists.rows.length === 0) {
      throw new NotFoundError('Pedido não encontrado');
    }

    const produtoExists = await db.query('SELECT id FROM produtos WHERE id = $1', [produto_id]);
    if (produtoExists.rows.length === 0) {
      throw new NotFoundError('Produto não encontrado');
    }

    // Criação do item
    const novoItem = await ItensRepository.create({
      pedido_id,
      produto_id,
      nome,
      quantidade,
      preco_unitario
    });

    return novoItem;
  }

  // Atualização
  static async update(id, data) {
    const { nome, quantidade, preco_unitario } = data;

    const item = await ItensRepository.findById(id);
    if (!item) throw new NotFoundError('Item não encontrado');

    if (quantidade !== undefined && quantidade <= 0)
      throw new ValidationError('A quantidade deve ser maior que zero');

    if (preco_unitario !== undefined && preco_unitario <= 0)
      throw new ValidationError('O preço unitário deve ser maior que zero');

    const updated = await ItensRepository.update(id, {
      nome: nome || item.nome,
      quantidade: quantidade || item.quantidade,
      preco_unitario: preco_unitario || item.preco_unitario
    });

    return updated;
  }

  // Remoção
  static async remove(id) {
    const item = await ItensRepository.findById(id);
    if (!item) throw new NotFoundError('Item não encontrado');

    await ItensRepository.remove(id);
    return { message: 'Item removido com sucesso' };
  }
}

module.exports = ItensService;
