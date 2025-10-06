const PedidoService = require('../services/pedidosService');

class PedidoController {
  async getAll(req, res) {
    try {
      const { usuario_id } = req.query;

      let pedidos;
      if (usuario_id) {
        pedidos = await PedidoService.getByUsuario(usuario_id);
      } else {
        pedidos = await PedidoService.getAll();
      }

      res.status(200).json(pedidos);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar pedidos.' });
    }
  }

  async getById(req, res) {
    try {
      const pedido = await PedidoService.getById(req.params.id);
      res.status(200).json(pedido);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const pedido = await PedidoService.create(req.body);
      res.status(201).json({
        message: 'Pedido criado com sucesso.',
        data: pedido
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const pedido = await PedidoService.update(req.params.id, req.body);
      res.status(200).json({
        message: 'Pedido atualizado com sucesso.',
        data: pedido
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  async remove(req, res) {
    try {
      await PedidoService.remove(req.params.id);
      res.status(200).json({ message: 'Pedido removido com sucesso.' });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = new PedidoController();