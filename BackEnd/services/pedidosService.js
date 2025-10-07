const repository = require('../repository/pedidosRepository');
const ItensRepository = require('../repository/itensRepository')
const db = require('../db/db')
const { ValidationError, NotFoundError } = require('../utils/errors');
const { it } = require('node:test');

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
        console.log(itens)
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

  // 🔥 Novo método de criação de pedido com itens
  static async create(data) {
    const client = await db.pool.connect(); // pega o client da pool
    try {
      await client.query('BEGIN');

      // 1️⃣ Cria o pedido
      const pedido = await repository.create(
        {
          id: data.id,
          usuario_id: data.usuario_id,
          data: data.data,
          status: data.status,
          total: data.total,
          forma_pagamento: data.forma_pagamento
        },
        client // Passa o client para manter a transação
      );

      if (!pedido) {
        throw new ValidationError('Erro ao criar pedido.');
      }

      // 2️⃣ Cria os itens vinculados ao pedido
      const itens = Array.isArray(data.itens) ? data.itens : [];

      for (const item of itens) {
        console.log(item)
        await ItensRepository.create(
          {
            id: item.id,
            pedido_id: pedido.id,
            produto_id: item.produto_id,
            imageurl: item.imageurl,
            nome: item.nome,
            quantidade: item.quantidade,
            preco_unitario: item.preco_unitario
          },
          client
        );
      }

      await client.query('COMMIT');

      // 3️⃣ Retorna o pedido com os itens completos
      const itensCriados = await ItensRepository.findByPedidoId(pedido.id);
      return {
        ...pedido,
        itens: itensCriados
      };
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Erro ao criar pedido com itens:', err);
      throw new Error('Erro ao criar pedido com itens.');
    } finally {
      client.release();
    }
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
