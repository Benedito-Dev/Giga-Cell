const express = require('express');
const cors = require('cors');
const app = express();

// CORS liberal para permitir acesso de qualquer origem
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando', status: 'OK' });
});

app.post('/produtos/filtro', (req, res) => {
  res.json({ message: 'Filtro funcionando', data: [] });
});

module.exports = app;