const adminService = require('../services/adminService');

class AdminController {
  async getAll(req, res) {
    try {
      const admins = await adminService.listarTodos();
      res.json(admins);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const admin = await adminService.buscarPorId(req.params.id);
      res.json(admin);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const novoAdmin = await adminService.criarAdmin(req.body);
      res.status(201).json(novoAdmin);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const atualizado = await adminService.atualizarAdmin(req.params.id, req.body);
      res.json(atualizado);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const removido = await adminService.removerAdmin(req.params.id);
      res.json(removido);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new AdminController();
