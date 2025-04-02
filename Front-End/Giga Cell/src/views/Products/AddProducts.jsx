import { useState } from 'react';
import NavBarr from '../../components/NavBarr';
import SubBarr from '../../components/SubBarr';

function AddProducts() {
  const [product, setProduct] = useState({
    nome: '',
    imagemUrl: '',
    preco: '',
    categoria: 'celular',
    descricao: '',
    estoque: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
  
    // Validação básica
    if (!product.nome || !product.imagemUrl || !product.preco || !product.estoque) {
      setErrorMessage('Preencha todos os campos obrigatórios');
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...product,
          preco: Number(product.preco),
          estoque: Number(product.estoque)
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar produto');
      }
  
      const createdProduct = await response.json(); // Renomeado para melhor semântica
      
      // Usando o dado retornado para feedback mais completo
      setSuccessMessage(`Produto "${createdProduct.nome}" cadastrado com sucesso com ID ${createdProduct.id}`);
      
      // Limpa o formulário
      setProduct({
        nome: '',
        imagemUrl: '',
        preco: '',
        categoria: 'celulares',
        descricao: '',
        estoque: ''
      });
  
      // Opcional: redirecionar ou atualizar lista de produtos
      // navigate('/produtos');
      // Ou atualizar estado global/contexto com o novo produto
  
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setErrorMessage(error.message || 'Ocorreu um erro ao cadastrar o produto');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBarr />
      <SubBarr />
      
      <main className="flex-grow p-6">
        <div className="max-w-6xl mx-auto mt-0 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Adicionar Novo Produto</h2>
          
          {/* Mensagens de feedback */}
          {errorMessage && (
            <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
              {errorMessage}
            </div>
          )}
          
          {successMessage && (
            <div className="p-4 mb-6 text-sm text-green-700 bg-green-100 rounded-lg">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coluna 1 */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="nome" className="block text-lg font-medium text-black">
                    Nome do Produto: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={product.nome}
                    onChange={handleChange}
                    placeholder="Digite o nome do produto"
                    className="mt-1 block bg-slate-200 text-black placeholder-black placeholder-opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="imagemUrl" className="block text-lg font-medium text-black">
                    URL da Imagem: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    id="imagemUrl"
                    name="imagemUrl"
                    value={product.imagemUrl}
                    onChange={handleChange}
                    placeholder="Digite a URL da imagem"
                    className="mt-1 block bg-slate-200 text-black placeholder-black placeholder-opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="categoria" className="block text-lg font-medium text-black">
                    Categoria: <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="categoria"
                    name="categoria"
                    value={product.categoria}
                    onChange={handleChange}
                    className="mt-1 block bg-slate-200 text-black w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    required
                  >
                    <option value="celulares">Celular</option>
                    <option value="acessorios">Acessório</option>
                  </select>
                </div>
              </div>

              {/* Coluna 2 */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="preco" className="block text-lg font-medium text-black">
                    Preço (R$): <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">R$</span>
                    </div>
                    <input
                      type="number"
                      id="preco"
                      name="preco"
                      value={product.preco}
                      onChange={handleChange}
                      placeholder="0,00"
                      className="block w-full bg-slate-200 text-black placeholder-black placeholder-opacity-50 pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="descricao" className="block text-lg font-medium text-black">
                    Descrição:
                  </label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    value={product.descricao}
                    onChange={handleChange}
                    placeholder="Digite a descrição do produto"
                    className="mt-1 block bg-slate-200 text-black placeholder-black placeholder-opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px]"
                    rows="5"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="estoque" className="block text-lg font-medium text-black">
                    Estoque: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="estoque"
                    name="estoque"
                    value={product.estoque}
                    onChange={handleChange}
                    placeholder="Quantidade em estoque"
                    className="mt-1 block bg-slate-200 text-black placeholder-black placeholder-opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-md text-lg font-medium ${
                  isSubmitting 
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar Produto'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddProducts;