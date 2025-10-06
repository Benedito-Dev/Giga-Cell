const express = require('express');
const controller = require('../controllers/adminController');

class AdminRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    /**
     * @swagger
     * tags:
     *   - name: Admin
     *     description: Gestão de administradores do sistema GigaCell
     */

    /**
     * @swagger
     * /admin:
     *   get:
     *     summary: Lista todos os administradores
     *     tags: [Admin]
     *     responses:
     *       200:
     *         description: Lista de administradores
     */
    this.router.get('/', controller.getAll);

    /**
     * @swagger
     * /admin/{id}:
     *   get:
     *     summary: Obtém um administrador pelo ID
     *     tags: [Admin]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID do administrador
     *     responses:
     *       200:
     *         description: Administrador encontrado
     *       404:
     *         description: Administrador não encontrado
     */
    this.router.get('/:id', controller.getById);

    /**
     * @swagger
     * /admin:
     *   post:
     *     summary: Cria um novo administrador
     *     tags: [Admin]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Admin'
     *     responses:
     *       201:
     *         description: Administrador criado com sucesso
     */
    this.router.post('/', controller.create);

    /**
     * @swagger
     * /admin/{id}:
     *   put:
     *     summary: Atualiza um administrador existente
     *     tags: [Admin]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Admin'
     *     responses:
     *       200:
     *         description: Administrador atualizado com sucesso
     */
    this.router.put('/:id', controller.update);

    /**
     * @swagger
     * /admin/{id}:
     *   delete:
     *     summary: Remove um administrador
     *     tags: [Admin]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Administrador removido com sucesso
     */
    this.router.delete('/:id', controller.delete);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new AdminRoutes().getRouter();
