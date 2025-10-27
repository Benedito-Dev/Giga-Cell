const express = require('express');
const cors = require('cors');
const app = express();

// Desabilita CORS completamente - permite qualquer origem
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Max-Age', '86400');
  
  // Responde imediatamente para OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando', status: 'OK' });
});

// Rota GET para produtos
app.get('/produtos', (req, res) => {
  const { category } = req.query;
  
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
  
  // Filtra por categoria se fornecida
  const filteredData = category ? mockData.filter(p => p.categoria === category) : mockData;
  
  res.json(filteredData);
});

// Rota POST para produtos com filtro
app.post('/produtos/filtro', (req, res) => {
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