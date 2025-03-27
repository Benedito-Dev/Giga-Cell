// src/ListaCelulares.jsx
import { useState, useEffect } from 'react';

const ListaCelulares = () => {
  const [celulares, setCelulares] = useState([]); // Estado para armazenar a lista de celulares
  const [loading, setLoading] = useState(false); // Estado para indicar se a requisição está em andamento
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro

  // Função para buscar todos os celulares
  const fetchCelulares = async () => {
    setLoading(true);
    setError(null);

    try {
      // Faz a requisição GET para a rota /celulares
      const response = await fetch('http://localhost:3000/celulares');
      if (!response.ok) {
        throw new Error('Erro ao buscar celulares');
      }
      const data = await response.json(); // Converte a resposta para JSON
      setCelulares(data); // Atualiza o estado com os dados recebidos
    } catch (err) {
      setError(err.message); // Captura e exibe erros
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Executa a busca quando o componente é montado
  useEffect(() => {
    fetchCelulares();
  }, []); // O array vazio [] garante que o useEffect só execute uma vez (ao montar o componente)

  return (
    <div>
      <h1>Lista de Celulares</h1>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Lista de celulares */}
      <ul>
        {celulares.map((celular) => (
          <li key={celular.id}>
            <strong>{celular.modelo}</strong> - R$ {celular.preco}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaCelulares;