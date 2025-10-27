const express = require('express');
const app = express();

// Middleware para desabilitar CORS completamente
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json());

// Rota raiz
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando', status: 'OK' });
});

// Rota GET produtos
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
  
  const filteredData = category ? mockData.filter(p => p.categoria === category) : mockData;
  res.json(filteredData);
});

// Rota POST produtos/filtro
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