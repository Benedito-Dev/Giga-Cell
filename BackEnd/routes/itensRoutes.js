const express = require('express');
const controller = require('../controllers/itensController');

class ItensRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    /**
     * @swagger
     * tags:
     *   - name: Itens
     *     description: Gestão dos itens de cada pedido
     */

    /**
     * @swagger
     * /itens:
     *   get:
     *     summary: Lista todos os itens cadastrados
     *     tags: [Itens]
     *     responses:
     *       200:
     *         description: Lista de itens retornada com sucesso
     */
    this.router.get('/', controller.getAll);

    /**
     * @swagger
     * /itens/{id}:
     *   get:
     *     summary: Obtém um item pelo ID
     *     tags: [Itens]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID do item
     *     responses:
     *       200:
     *         description: Item encontrado
     *       404:
     *         description: Item não encontrado
     */
    this.router.get('/:id', controller.getById);

    /**
     * @swagger
     * /itens:
     *   post:
     *     summary: Cria um novo item vinculado a um pedido
     *     tags: [Itens]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Item'
     *     responses:
     *       201:
     *         description: Item criado com sucesso
     */
    this.router.post('/', controller.create);

    /**
     * @swagger
     * /itens/{id}:
     *   put:
     *     summary: Atualiza um item existente
     *     tags: [Itens]
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
     *             $ref: '#/components/schemas/Item'
     *     responses:
     *       200:
     *         description: Item atualizado com sucesso
     *       404:
     *         description: Item não encontrado
     */
    this.router.put('/:id', controller.update);

    /**
     * @swagger
     * /itens/{id}:
     *   delete:
     *     summary: Remove um item pelo ID
     *     tags: [Itens]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Item removido com sucesso
     *       404:
     *         description: Item não encontrado
     */
    this.router.delete('/:id', controller.remove);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new ItensRoutes().getRouter();
