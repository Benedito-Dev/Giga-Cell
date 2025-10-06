const express = require('express');
const controller = require('../controllers/pedidosController');

class PedidosRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    /**
     * @swagger
     * tags:
     *   - name: Pedidos
     *     description: Gestão de pedidos no sistema GigaCell
     */

    /**
     * @swagger
     * /pedidos:
     *   get:
     *     summary: Lista todos os pedidos
     *     tags: [Pedidos]
     *     responses:
     *       200:
     *         description: Lista de pedidos
     */
    this.router.get('/', controller.getAll);

    /**
     * @swagger
     * /pedidos/{id}:
     *   get:
     *     summary: Obtém um pedido pelo ID
     *     tags: [Pedidos]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID do pedido
     *     responses:
     *       200:
     *         description: Pedido encontrado
     *       404:
     *         description: Pedido não encontrado
     */
    this.router.get('/:id', controller.getById);

    /**
     * @swagger
     * /pedidos:
     *   post:
     *     summary: Cria um novo pedido
     *     tags: [Pedidos]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Pedido'
     *     responses:
     *       201:
     *         description: Pedido criado com sucesso
     */
    this.router.post('/', controller.create);

    /**
     * @swagger
     * /pedidos/{id}:
     *   put:
     *     summary: Atualiza um pedido existente
     *     tags: [Pedidos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Pedido'
     *     responses:
     *       200:
     *         description: Pedido atualizado com sucesso
     */
    this.router.put('/:id', controller.update);

    /**
     * @swagger
     * /pedidos/{id}:
     *   delete:
     *     summary: Remove um pedido
     *     tags: [Pedidos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Pedido removido com sucesso
     */
    this.router.delete('/:id', controller.remove);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new PedidosRoutes().getRouter();
