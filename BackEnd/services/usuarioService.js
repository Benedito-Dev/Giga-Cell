const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const Usuario = require('../models/UsuarioModel');
const usuarioRepository = require('../repository/usuarioRepository');

const SALT_ROUNDS = 10;

class UsuarioService {
  async listarTodos() {
    return await usuarioRepository.findAll();
  }

  async buscarPorId(id) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) throw new Error('Usuário não encontrado');
    return usuario;
  }

  async criarUsuario(dados) {
    const existente = await usuarioRepository.findByEmail(dados.email);
    if (existente) throw new Error('E-mail já cadastrado');

    // Hash da senha usando bcrypt
    const senhaHash = await bcrypt.hash(dados.senha, SALT_ROUNDS);

    const novoUsuario = new Usuario({
      id_usuario: uuidv4(),
      nome: dados.nome,
      email: dados.email,
      senha: senhaHash,
      cpf: dados.cpf,
      telefone: dados.telefone,
      endereco: dados.endereco,
    });

    return await usuarioRepository.create(novoUsuario);
  }

  async atualizarUsuario(id, dados) {
    const usuarioExistente = await usuarioRepository.findById(id);
    if (!usuarioExistente) throw new Error('Usuário não encontrado');

    return await usuarioRepository.update(id, dados);
  }

  async removerUsuario(id) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) throw new Error('Usuário não encontrado');

    return await usuarioRepository.remove(id);
  }
}

module.exports = new UsuarioService();
