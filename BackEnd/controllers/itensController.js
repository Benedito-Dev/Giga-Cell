const ItensService = require('../services/itensService');
const { handleControllerError } = require('../utils/errors');

class ItensController {
  /**
   * Lista todos os itens
   */
  static async getAll(req, res) {
    try {
      const itens = await ItensService.getAll();
      res.status(200).json(itens);
    } catch (error) {
      handleControllerError(res, error);
    }
  }

  /**
   * Busca item por ID
   */
  static async getById(req, res) {
    try {
      const item = await ItensService.getById(req.params.id);
      res.status(200).json(item);
    } catch (error) {
      handleControllerError(res, error);
    }
  }

  /**
   * Cria novo item
   */
  static async create(req, res) {
    try {
      const novoItem = await ItensService.create(req.body);
      res.status(201).json({
        message: 'Item criado com sucesso!',
        data: novoItem
      });
    } catch (error) {
      handleControllerError(res, error);
    }
  }

  /**
   * Atualiza item existente
   */
  static async update(req, res) {
    try {
      const itemAtualizado = await ItensService.update(req.params.id, req.body);
      res.status(200).json({
        message: 'Item atualizado com sucesso!',
        data: itemAtualizado
      });
    } catch (error) {
      handleControllerError(res, error);
    }
  }

  /**
   * Remove item pelo ID
   */
  static async remove(req, res) {
    try {
      await ItensService.remove(req.params.id);
      res.status(200).json({ message: 'Item removido com sucesso!' });
    } catch (error) {
      handleControllerError(res, error);
    }
  }
}

module.exports = ItensController;
