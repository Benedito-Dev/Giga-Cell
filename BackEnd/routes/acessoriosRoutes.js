const express = require('express');
const controller = require('../controllers/acessoriosController');

class AcessoriosRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    /**
     * @swagger
     * tags:
     *   - name: Acessorios
     *     description: Gestão de acessórios
     */

    /**
     * @swagger
     * /acessorios:
     *   get:
     *     summary: Lista todos os acessórios
     *     tags: [Acessorios]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de acessórios
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Acessorio'
     */
    this.router.get('/', controller.getAll);

    /**
     * @swagger
     * /acessorios/{id}:
     *   get:
     *     summary: Obtém um acessório pelo ID
     *     tags: [Acessorios]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID do acessório
     *     responses:
     *       200:
     *         description: Acessório encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Acessorio'
     *       404:
     *         description: Acessório não encontrado
     */
    this.router.get('/:id', controller.getById);

    /**
     * @swagger
     * /acessorios:
     *   post:
     *     summary: Cria um novo acessório
     *     tags: [Acessorios]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Acessorio'
     *     responses:
     *       201:
     *         description: Acessório criado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Acessorio'
     *       400:
     *         description: Dados inválidos
     */
    this.router.post('/', controller.create);

    /**
     * @swagger
     * /acessorios/{id}:
     *   put:
     *     summary: Atualiza um acessório existente
     *     tags: [Acessorios]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do acessório
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Acessorio'
     *     responses:
     *       200:
     *         description: Acessório atualizado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Acessorio'
     *       404:
     *         description: Acessório não encontrado
     */
    this.router.put('/:id', controller.update);

    /**
     * @swagger
     * /acessorios/{id}:
     *   delete:
     *     summary: Remove um acessório
     *     tags: [Acessorios]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do acessório
     *     responses:
     *       200:
     *         description: Acessório removido com sucesso
     */
    this.router.delete('/:id', controller.remove);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new AcessoriosRoutes().getRouter();
