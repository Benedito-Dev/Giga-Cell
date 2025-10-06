const repository = require('../repository/pedidosRepository');
const ItensRepository = require('../repository/itensRepository')
const { ValidationError, NotFoundError } = require('../utils/errors');

class PedidoService {
  // Retorna todos os pedidos
  static async getAll() {
    return await repository.findAll();
  }

  // Retorna pedidos de um usuário específico
  // static async getByUsuario(usuario_id) {
  //   if (!usuario_id) throw new ValidationError('ID do usuário é obrigatório.');
  //   return await repository.findByUsuario(usuario_id);
  // }

  // 🔥 NOVO MÉTODO: Pedidos + Itens do Usuário
  static async getByUsuario(usuario_id) {
    if (!usuario_id) throw new ValidationError('ID do usuário é obrigatório.');

    // 1️⃣ Busca todos os pedidos do usuário
    const pedidos = await repository.findByUsuario(usuario_id);

    // 2️⃣ Para cada pedido, busca os itens
    const pedidosComItens = await Promise.all(
      pedidos.map(async (pedido) => {
        const itens = await ItensRepository.findByPedidoId(pedido.id);
        return {
          ...pedido,
          itens,
        };
      })
    );

    return pedidosComItens;
  }

  // Retorna um pedido específico por ID
  static async getById(id) {
    if (!id) throw new ValidationError('ID do pedido é obrigatório.');
    const pedido = await repository.findById(id);
    if (!pedido) throw new NotFoundError('Pedido não encontrado.');
    return pedido;
  }

  // Cria um novo pedido
  static async create(data) {
    const { id, usuario_id, data: dataPedido, status, total, forma_pagamento } = data;

    if (!usuario_id || !total || !forma_pagamento) {
      throw new ValidationError('Campos obrigatórios: usuario_id, total, forma_pagamento.');
    }

    return await repository.create({
      id,
      usuario_id,
      data: dataPedido,
      status,
      total,
      forma_pagamento,
    });
  }

  // Atualiza um pedido existente
  static async update(id, data) {
    if (!id) throw new ValidationError('ID do pedido é obrigatório.');
    const updated = await repository.update(id, data);
    if (!updated) throw new NotFoundError('Pedido não encontrado para atualizar.');
    return updated;
  }

  // Remove um pedido
  static async remove(id) {
    if (!id) throw new ValidationError('ID do pedido é obrigatório.');
    const removed = await repository.remove(id);
    if (!removed) throw new NotFoundError('Pedido não encontrado para remover.');
    return removed;
  }
}

module.exports = PedidoService;
