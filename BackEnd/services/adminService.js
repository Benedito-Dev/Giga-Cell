const { v4: uuidv4 } = require('uuid');
const Admin = require('../models/AdminModel');
const adminRepository = require('../repository/adminRepository');

class AdminService {
  async listarTodos() {
    return await adminRepository.findAll();
  }

  async buscarPorId(id) {
    const admin = await adminRepository.findById(id);
    if (!admin) throw new Error('Administrador não encontrado');
    return admin;
  }

  async criarAdmin(dados) {
    const existente = await adminRepository.findByEmail(dados.email);
    if (existente) throw new Error('E-mail já cadastrado');

    const senhaHash = await Admin.hashPassword(dados.senha);
    const novoAdmin = new Admin({
      id_admin: uuidv4(),
      nome: dados.nome,
      email: dados.email,
      senha: senhaHash,
      nivel_acesso: dados.nivel_acesso
    });

    return await adminRepository.create(novoAdmin);
  }

  async atualizarAdmin(id, dados) {
    const adminExistente = await adminRepository.findById(id);
    if (!adminExistente) throw new Error('Administrador não encontrado');

    // Se a senha for atualizada, gera hash
    if (dados.senha) {
      dados.senha = await Admin.hashPassword(dados.senha);
    }

    return await adminRepository.update(id, dados);
  }

  async removerAdmin(id) {
    const admin = await adminRepository.findById(id);
    if (!admin) throw new Error('Administrador não encontrado');

    return await adminRepository.remove(id);
  }
}

module.exports = new AdminService();
