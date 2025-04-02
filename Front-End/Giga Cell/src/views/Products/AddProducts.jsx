// src/views/Products/AddProducts.jsx
import { useState } from 'react';

export function AddProducts() {
  const [product, setProduct] = useState({
    nome: '',
    imagemUrl: '',
    preco: '',
    categoria: 'celular' // Valor padrão
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Produto enviado:', product);
    // Aqui você adicionará a lógica para enviar ao backend
  };

  return (
    <div className="add-product-container">
      <h2>Adicionar Novo Produto</h2>
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="nome">Nome do Produto:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={product.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imagemUrl">URL da Imagem:</label>
          <input
            type="url"
            id="imagemUrl"
            name="imagemUrl"
            value={product.imagemUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="preco">Preço (R$):</label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={product.preco}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoria:</label>
          <select
            id="categoria"
            name="categoria"
            value={product.categoria}
            onChange={handleChange}
            required
          >
            <option value="celular">Celular</option>
            <option value="acessorio">Acessório</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
}