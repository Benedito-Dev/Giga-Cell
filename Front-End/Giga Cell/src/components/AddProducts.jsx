// src/views/Products/AddProducts.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function AddProducts() {
  const [product, setProduct] = useState({
    nome: '',
    imagemUrl: '',
    preco: '',
    categoria: 'celular' // valor padrão
  });
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Envia para a rota correta baseada na categoria
      const endpoint = product.categoria === 'celular' 
        ? 'http://localhost:3000/celulares' 
        : 'http://localhost:3000/acessorios';

      const payload = product.categoria === 'celular'
        ? {
            marca: product.nome.split(' ')[0], // Extrai a marca do nome
            modelo: product.nome,
            armazenamento_gb: 128, // Valor padrão
            ram_gb: 8, // Valor padrão
            sistema_operacional: product.categoria === 'celular' ? 'Android' : 'N/A',
            preco: parseFloat(product.preco),
            lancamento: new Date().toISOString().split('T')[0],
            imagemUrl: product.imagemUrl
          }
        : {
            nome: product.nome,
            tipo: 'outros',
            marca: product.nome.split(' ')[0],
            compatibilidade: ['todos'],
            imagemUrl: product.imagemUrl,
            material: 'desconhecido',
            cores_disponiveis: ['preto'],
            preco: parseFloat(product.preco),
            estoque: 10, // Valor padrão
            garantia_meses: 12 // Valor padrão
          };

      await axios.post(endpoint, payload);
      alert('Produto cadastrado com sucesso!');
      navigate('/produtos'); // Redireciona para a lista de produtos
      
    } catch (err) {
      setError('Erro ao cadastrar produto: ' + (err.response?.data?.message || err.message));
      console.error('Erro:', err);
    }
  };

  return (
    <div className="add-product-form">
      <h2>Adicionar Novo Produto</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={product.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>URL da Imagem:</label>
          <input
            type="url"
            name="imagemUrl"
            value={product.imagemUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Preço:</label>
          <input
            type="number"
            name="preco"
            value={product.preco}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Categoria:</label>
          <select
            name="categoria"
            value={product.categoria}
            onChange={handleChange}
            required
          >
            <option value="celular">Celular</option>
            <option value="acessorio">Acessório</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
}