const CelularService = require('../services/celularesService');

class CelularesController {
  // Buscar todos os celulares
  async getAll(req, res) {
    try {
      const celulares = await CelularService.getAll();
      res.status(200).json(celulares);
    } catch (error) {
      console.error('Erro ao buscar celulares:', error);

      if (error.statusCode) return res.status(error.statusCode).json({ error: error.message });
      if (error.code === 'ECONNREFUSED') return res.status(503).json({ error: 'Serviço de banco de dados indisponível.' });

      res.status(500).json({ error: 'Erro interno ao buscar celulares.' });
    }
  }

  // Buscar celular por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const celular = await CelularService.getById(id);

      if (!celular) return res.status(404).json({ error: 'Celular não encontrado.' });

      res.status(200).json(celular);
    } catch (error) {
      console.error('Erro ao buscar celular por ID:', error);

      if (error.statusCode) return res.status(error.statusCode).json({ error: error.message });
      res.status(500).json({ error: 'Erro interno ao buscar celular.' });
    }
  }

  // Criar novo celular
  async create(req, res) {
    try {
      const dadosCelular = req.body;
      const novoCelular = await CelularService.create(dadosCelular);

      res.status(201).json({ message: 'Celular criado com sucesso', data: novoCelular });
    } catch (error) {
      console.error('Erro ao criar celular:', error);

      if (error.statusCode) return res.status(error.statusCode).json({ error: error.message });
      if (error.name === 'ValidationError') return res.status(400).json({ error: 'Dados inválidos.', details: error.message });

      res.status(500).json({ error: 'Erro interno ao criar celular.' });
    }
  }

  // Atualizar dados do celular
  async update(req, res) {
    try {
      const { id } = req.params;
      const dadosAtualizacao = req.body;

      const celularAtualizado = await CelularService.update(id, dadosAtualizacao);
      if (!celularAtualizado) return res.status(404).json({ error: 'Celular não encontrado para atualizar.' });

      res.status(200).json({ message: 'Celular atualizado com sucesso', data: celularAtualizado });
    } catch (error) {
      console.error('Erro ao atualizar celular:', error);

      if (error.statusCode) return res.status(error.statusCode).json({ error: error.message });
      if (error.name === 'ValidationError') return res.status(400).json({ error: 'Dados inválidos.', details: error.message });

      res.status(500).json({ error: 'Erro interno ao atualizar celular.' });
    }
  }

  // Remover celular
  async remove(req, res) {
    try {
      const { id } = req.params;

      const resultado = await CelularService.remove(id);
      if (!resultado) return res.status(404).json({ error: 'Celular não encontrado para remover.' });

      res.status(200).json({ message: 'Celular removido com sucesso.' });
    } catch (error) {
      console.error('Erro ao remover celular:', error);

      if (error.statusCode) return res.status(error.statusCode).json({ error: error.message });
      if (error.name === 'ValidationError') return res.status(400).json({ error: 'Dados inválidos.', details: error.message });

      res.status(500).json({ error: 'Erro interno ao remover celular.' });
    }
  }
}

module.exports = new CelularesController();
