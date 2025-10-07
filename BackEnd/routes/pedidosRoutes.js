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
     *           type: string
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
     * /pedidos/usuario/{usuario_id}:
     *   get:
     *     summary: Obtém os pedidos de um usuario
     *     tags: [Pedidos]
     *     parameters:
     *       - in: path
     *         name: usuario_id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID do usuario
     *         example: "595a107c-b797-4a31-96c5-7b662badc251"  # 👈 exemplo real ajuda
     *     responses:
     *       200:
     *         description: Pedidos encontrado
     *       404:
     *         description: Pedido não encontrado
     */
    this.router.get('/usuario/:usuario_id', controller.getByUsuario);

    /**
     * @swagger
     * /pedidos:
     *   post:
     *     summary: Cria um novo pedido com itens
     *     tags: [Pedidos]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/PedidoCreate'
     *           example:
     *             id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0"
     *             usuario_id: "595a107c-b797-4a31-96c5-7b662badc251"
     *             data: "2025-10-06T23:00:00Z"
     *             status: "pendente"
     *             total: 150.75
     *             forma_pagamento: "cartao_credito"
     *             itens:
     *               - id: "item1-uuid-1234"
     *                 produto_id: "produto-uuid-1111"
     *                 nome: "Iphone 15"
     *                 quantidade: 2
     *                 preco_unitario: 50.00
     *               - id: "item2-uuid-5678"
     *                 produto_id: "produto-uuid-2222"
     *                 nome: "TV"
     *                 quantidade: 1
     *                 preco_unitario: 50.75
     *     responses:
     *       201:
     *         description: Pedido criado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Pedido'
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
