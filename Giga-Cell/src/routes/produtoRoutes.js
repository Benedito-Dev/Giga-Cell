const express = require('express');
const router = express.Router();
const { Produto } = require('../models');

router.get('/produtos', async (req, res) => {
    const produtos = await Produto.findAll();
    res.json(produtos);
});

router.post('/produtos', async (req, res) => {
    const { nome, preco, descricao, estoque } = req.body;
    const novoProduto = await Produto.create({ nome, preco, descricao, estoque });
    res.json(novoProduto);
});

module.exports = router;
