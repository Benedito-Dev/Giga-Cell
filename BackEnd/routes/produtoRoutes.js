const express = require('express');
const controller = require('../controllers/produtosController');

class ProductsRoutes {
  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    /**
     * @swagger
     * tags:
     *   - name: Produtos
     *     description: Gestão de produtos do sistema
     */

    /**
     * @swagger
     * /produtos:
     *   get:
     *     summary: Lista todos os produtos
     *     tags: [Produtos]
     *     responses:
     *       200:
     *         description: Lista de produtos
     */
    this.router.get('/', controller.getAll);

   /**
     * @swagger
     * /produtos/filtro:
     *   post:
     *     summary: Filtra produtos com base em marca, cor e armazenamento
     *     tags: [Produtos]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ProdutoFiltro'
     *     responses:
     *       200:
     *         description: Lista de produtos filtrados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Produto'
     *       400:
     *         description: Filtros inválidos
     *       500:
     *         description: Erro interno do servidor
     */
    this.router.post('/filtro', controller.filter);

    /**
     * @swagger
     * /produtos/{id}:
     *   get:
     *     summary: Obtém um produto pelo ID
     *     tags: [Produtos]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID do produto
     *     responses:
     *       200:
     *         description: Produto encontrado
     *       404:
     *         description: Produto não encontrado
     */
    this.router.get('/:id', controller.getById);

    /**
     * @swagger
     * /produtos:
     *   post:
     *     summary: Cria um novo produto
     *     tags: [Produtos]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Produto'
     *     responses:
     *       201:
     *         description: Produto criado
     */
    this.router.post('/', controller.create);

    /**
     * @swagger
     * /produtos/{id}:
     *   put:
     *     summary: Atualiza um produto
     *     tags: [Produtos]
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
     *             $ref: '#/components/schemas/Produto'
     *     responses:
     *       200:
     *         description: Produto atualizado
     */
    this.router.put('/:id', controller.update);

    /**
     * @swagger
     * /produtos/{id}:
     *   delete:
     *     summary: Remove um produto
     *     tags: [Produtos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Produto removido
     */
    this.router.delete('/:id', controller.remove);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new ProductsRoutes().getRouter();
