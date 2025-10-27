require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// Rotas
const celularesRoutes = require('./routes/celularRoutes');
const acessoriosRoutes = require('./routes/acessoriosRoutes');
const produtosRoutes = require('./routes/produtoRoutes')
const usuarioRoutes = require('./routes/usuarioRoutes')
const pedidosRoutes = require('./routes/pedidosRoutes');
const itensRoutes = require('./routes/itensRoutes')
const adminRoutes = require('./routes/adminRoutes')
const authRoutes = require('./routes/authRoutes')
// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');

// Middleware global de erros
const errorHandler = require('./middleware/errorHandler');


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.configureMiddlewares();
    this.routes();
  }

  configureMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors({
      origin: process.env.NODE_ENV === 'production' 
        ? ['https://seu-frontend.vercel.app'] // Substitua pela URL do seu frontend
        : ['http://localhost:5173', 'http://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
    this.app.use(morgan('dev'));

    // Pasta 'uploads' pública
    this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // Documentação Swagger
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
      swaggerOptions: { persistAuthorization: true }
    }));
  }

  routes() {
    this.app.use('/celulares', celularesRoutes);
    this.app.use('/acessorios', acessoriosRoutes);
    this.app.use('/produtos', produtosRoutes);
    this.app.use('/usuarios', usuarioRoutes);
    this.app.use('/auth', authRoutes)
    this.app.use('/pedidos', pedidosRoutes);
    this.app.use('/itens', itensRoutes)
    this.app.use('/admin', adminRoutes)

    // Rota base
    this.app.get('/', (req, res) => {
      res.send('API backend Tecsim - Celulares e Acessórios!');
    });

    // Middleware global de erros (último da cadeia)
    this.app.use(errorHandler);

    // 404 para rotas não encontradas
    this.app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: 'Rota não encontrada'
      });
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Servidor rodando na porta ${this.port}`);
      console.log(`Documentação Swagger em http://localhost:${this.port}/api-docs`);
    });
  }
}

// Inicializa servidor
module.exports = Server;
