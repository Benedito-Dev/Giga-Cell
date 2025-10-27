const Server = require('./server');

// Cria instância do servidor
const server = new Server();

// Para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  server.start();
}

// Exporta o app do Express para Vercel
module.exports = server.app;