const ProductService = require('../services/produtosService');

class ProductController {
  async getAll(req, res) {
    try {
      const { category } = req.query;

      let produtos;
      if (category) {
        produtos = await ProductService.findByCategory(category);
      } else {
        produtos = await ProductService.getAll();
      }

      res.json(produtos);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
  }


  async getById(req, res) {
    try {
      const product = await ProductService.getById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const product = await ProductService.create(req.body);
      res.status(201).json({ message: 'Produto criado com sucesso', data: product });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const product = await ProductService.update(req.params.id, req.body);
      res.status(200).json({ message: 'Produto atualizado com sucesso', data: product });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  async remove(req, res) {
    try {
      await ProductService.remove(req.params.id);
      res.status(200).json({ message: 'Produto removido com sucesso' });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  async filter(req, res) {
    try {
      const filtros = req.body; // pega do corpo da requisição

      const produtos = await ProductService.filter(filtros);

      // Padroniza os campos para o frontend
      const formattedProducts = produtos.map(p => ({
        ...p,
        preco: p.preco_unitario,    // renomeia para "preco"
        imagemUrl: p.imagemurl      // renomeia para "imagemUrl"
      }));

      res.status(200).json(formattedProducts);
    } catch (err) {
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  }
}

module.exports = new ProductController();
