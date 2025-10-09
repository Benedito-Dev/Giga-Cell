const repository = require('../repository/pedidosRepository');
const ItensRepository = require('../repository/itensRepository');
const db = require('../db/db');
const { ValidationError, NotFoundError } = require('../utils/errors');
const emailSender = require('../utils/emailSender');
const usuarioRepository = require('../repository/usuarioRepository'); // ✅ adiciona esse import

class PedidoService {
  // Retorna todos os pedidos
  static async getAll() {
    return await repository.findAll();
  }

  // Pedidos + Itens do Usuário
  static async getByUsuario(usuario_id) {
    if (!usuario_id) throw new ValidationError('ID do usuário é obrigatório.');

    const pedidos = await repository.findByUsuario(usuario_id);

    const pedidosComItens = await Promise.all(
      pedidos.map(async (pedido) => {
        const itens = await ItensRepository.findByPedidoId(pedido.id);
        return { ...pedido, itens };
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

  // 🔥 Cria um novo pedido com itens e envia e-mail
  static async create(data) {
    const client = await db.pool.connect();
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
          forma_pagamento: data.forma_pagamento,
        },
        client
      );

      if (!pedido) throw new ValidationError('Erro ao criar pedido.');

      // 2️⃣ Cria os itens
      const itens = Array.isArray(data.itens) ? data.itens : [];
      for (const item of itens) {
        await ItensRepository.create(
          {
            id: item.id,
            pedido_id: pedido.id,
            produto_id: item.produto_id,
            image_url: item.image_url,
            nome: item.nome,
            quantidade: item.quantidade,
            preco_unitario: item.preco_unitario,
          },
          client
        );
      }

      await client.query('COMMIT');

      // 3️⃣ Busca os itens completos
      const itensCriados = await ItensRepository.findByPedidoId(pedido.id);
      const pedidoCompleto = { ...pedido, itens: itensCriados };

      // 4️⃣ Busca o e-mail do usuário
      try {
        const usuario = await usuarioRepository.findById(data.usuario_id);

        if (usuario?.email) {
          await emailSender.enviarEmailConfirmacao(usuario.email, pedidoCompleto);
          console.log(`📧 E-mail de confirmação enviado para ${usuario.email}`);
        } else {
          console.warn(`⚠️ Usuário ${data.usuario_id} não possui e-mail cadastrado.`);
        }
      } catch (emailErr) {
        console.error('❌ Erro ao enviar e-mail de confirmação:', emailErr.message);
        // ⚠️ não lança erro, para não impedir a criação do pedido
      }

      return pedidoCompleto;
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
