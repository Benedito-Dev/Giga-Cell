const AcessorioService = require('../services/acessoriosService');

class AcessorioController {
  async getAll(req, res) {
    try {
      const acessorios = await AcessorioService.getAll();
      res.status(200).json(acessorios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar acessórios.' });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const acessorio = await AcessorioService.getById(id);
      res.status(200).json(acessorio);
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const dados = req.body;
      const novoAcessorio = await AcessorioService.create(dados);
      res.status(201).json({ message: 'Acessório criado com sucesso', data: novoAcessorio });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const dados = req.body;
      const acessorioAtualizado = await AcessorioService.update(id, dados);
      res.status(200).json({ message: 'Acessório atualizado', data: acessorioAtualizado });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({ error: error.message });
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      const resultado = await AcessorioService.remove(id);
      res.status(200).json({ message: 'Acessório removido', data: resultado });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({ error: error.message });
    }
  }
}

module.exports = new AcessorioController();
