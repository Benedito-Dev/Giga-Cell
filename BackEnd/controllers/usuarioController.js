const usuarioService = require('../services/usuarioService');

class UsuarioController {
  async getAll(req, res) {
    try {
      const usuarios = await usuarioService.listarTodos();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const usuario = await usuarioService.buscarPorId(req.params.id);
      res.json(usuario);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const novo = await usuarioService.criarUsuario(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const atualizado = await usuarioService.atualizarUsuario(req.params.id, req.body);
      res.json(atualizado);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const removido = await usuarioService.removerUsuario(req.params.id);
      res.json(removido);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new UsuarioController();
