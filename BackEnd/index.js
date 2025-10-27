const express = require('express');
const cors = require('cors');
const app = express();

// CORS forçado para todas as rotas
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando', status: 'OK' });
});

// Rota de produtos com filtro
app.post('/produtos/filtro', (req, res) => {
  // Simulação de resposta para teste
  const mockData = [
    {
      "id": "7a1b3c9d-42f6-4e87-a91e-3c24efb03e65",
      "nome": "Tablet Galaxy Tab S9",
      "imagemUrl": "https://images.samsung.com/is/image/samsung/p6pim/br/sm-x510nzadzto/gallery/br-galaxy-tab-s9-fe-sm-x510-sm-x510nzadzto-538708899?$684_547_PNG$",
      "preco": "4299.90",
      "categoria": "tablet",
      "descricao": "Tablet Samsung Galaxy Tab S9 com tela AMOLED de 11 polegadas, 8GB RAM e 256GB de armazenamento.",
      "estoque": 12,
      "marca": "Samsung",
      "cor": "Preto",
      "armazenamento": "128GB"
    }
  ];
  
  res.json(mockData);
});

module.exports = app;