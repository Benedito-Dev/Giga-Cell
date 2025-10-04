const express = require('express');
const controller = require('../controllers/celularesController');
const authMiddleware = require('../middleware/authMiddleware');

class CelularesRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    /**
     * @swagger
     * tags:
     *   - name: Celulares
     *     description: Gestão de celulares do sistema
     */

    /**
     * @swagger
     * /celulares:
     *   get:
     *     summary: Lista todos os celulares
     *     tags: [Celulares]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de celulares
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Celular'
     *       401:
     *         description: Não autorizado
     *       500:
     *         description: Erro interno
     */
    this.router.get('/', controller.getAll);

    /**
     * @swagger
     * /celulares/{id}:
     *   get:
     *     summary: Obtém um celular pelo ID
     *     tags: [Celulares]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID do celular
     *     responses:
     *       200:
     *         description: Dados do celular
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Celular'
     *       404:
     *         description: Celular não encontrado
     *       401:
     *         description: Não autorizado
     */
    this.router.get('/:id', controller.getById);

    /**
     * @swagger
     * /celulares:
     *   post:
     *     summary: Cria um novo celular
     *     tags: [Celulares]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Celular'
     *     responses:
     *       201:
     *         description: Celular criado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Celular'
     *       400:
     *         description: Dados inválidos
     *       401:
     *         description: Não autorizado
     */
    this.router.post('/', controller.create);

    /**
     * @swagger
     * /celulares/{id}:
     *   put:
     *     summary: Atualiza os dados de um celular
     *     tags: [Celulares]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID do celular
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Celular'
     *     responses:
     *       200:
     *         description: Celular atualizado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Celular'
     *       400:
     *         description: Dados inválidos
     *       401:
     *         description: Não autorizado
     *       404:
     *         description: Celular não encontrado
     */
    this.router.put('/:id', controller.update);

    /**
     * @swagger
     * /celulares/{id}:
     *   delete:
     *     summary: Remove um celular
     *     tags: [Celulares]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID do celular
     *     responses:
     *       204:
     *         description: Celular removido com sucesso
     *       401:
     *         description: Não autorizado
     *       404:
     *         description: Celular não encontrado
     */
    this.router.delete('/:id', controller.remove);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new CelularesRoutes().getRouter();
