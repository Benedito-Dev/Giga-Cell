const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS middleware
app.use(cors({
  origin: ['https://giga-cell-3djp.vercel.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Mock data
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
  },
  {
    "id": "8b2c4d0e-53g7-5f98-b02f-4d35fgc04f76",
    "nome": "iPhone 15 Pro",
    "imagemUrl": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702774",
    "preco": "8999.00",
    "categoria": "celular",
    "descricao": "iPhone 15 Pro com chip A17 Pro, câmera de 48MP e tela Super Retina XDR de 6,1 polegadas.",
    "estoque": 8,
    "marca": "Apple",
    "cor": "Titânio Natural",
    "armazenamento": "256GB"
  },
  {
    "id": "9c3d5e1f-64h8-6g09-c13g-5e46ghd15g87",
    "nome": "AirPods Pro 2",
    "imagemUrl": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361",
    "preco": "2499.00",
    "categoria": "acessorio",
    "descricao": "AirPods Pro de 2ª geração com cancelamento ativo de ruído e áudio espacial.",
    "estoque": 15,
    "marca": "Apple",
    "cor": "Branco",
    "armazenamento": "N/A"
  }
];

// Rotas
app.get('/', (req, res) => {
  res.json({ message: 'Giga Cell API funcionando!', status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/produtos', (req, res) => {
  const { category } = req.query;
  const filteredData = category ? mockData.filter(p => p.categoria === category) : mockData;
  res.json(filteredData);
});

app.post('/produtos/filtro', (req, res) => {
  const { categoria, marca, precoMin, precoMax } = req.body;
  
  let filteredData = [...mockData];
  
  if (categoria) {
    filteredData = filteredData.filter(p => p.categoria === categoria);
  }
  
  if (marca) {
    filteredData = filteredData.filter(p => p.marca === marca);
  }
  
  if (precoMin) {
    filteredData = filteredData.filter(p => parseFloat(p.preco) >= parseFloat(precoMin));
  }
  
  if (precoMax) {
    filteredData = filteredData.filter(p => parseFloat(p.preco) <= parseFloat(precoMax));
  }
  
  res.json(filteredData);
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;