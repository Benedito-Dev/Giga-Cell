const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API GigaCell - E-commerce',
      version: '1.0.0',
      description: 'Documentação da API GigaCell com Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Celular: {
          type: 'object',
          required: [
            'id',
            'marca',
            'modelo',
            'sistema_operacional',
            'armazenamento_gb',
            'ram_gb',
            'preco',
            'lancamento',
            'estoque',
          ],
          properties: {
            id: { type: 'string', example: 'uuid-1234-5678' },
            marca: { type: 'string', example: 'Samsung' },
            modelo: { type: 'string', example: 'Galaxy S21' },
            imagemUrl: { type: 'string', format: 'uri', example: 'http://localhost:3000/images/galaxy-s21.png' },
            sistema_operacional: { type: 'string', example: 'Android 12' },
            armazenamento_gb: { type: 'integer', example: 128 },
            ram_gb: { type: 'integer', example: 8 },
            preco: { type: 'number', format: 'float', example: 4999.90 },
            lancamento: { type: 'string', format: 'date', example: '2021-01-29' },
            estoque: { type: 'integer', example: 15 },
          },
        },

        Acessorio: {
          type: 'object',
          required: ['id', 'nome', 'tipo', 'preco', 'estoque'],
          properties: {
            id: { type: 'string', example: 'uuid-1234-5678' },
            nome: { type: 'string', example: 'Capa Silicone Galaxy S21' },
            tipo: { type: 'string', example: 'Capa' },
            marca: { type: 'string', example: 'Samsung' },
            compatibilidade: {
              type: 'array',
              items: { type: 'string' },
              example: ['Galaxy S21', 'Galaxy S21 Plus'],
            },
            imagemUrl: { type: 'string', format: 'uri', example: 'http://localhost:3000/images/capa-galaxy-s21.png' },
            material: { type: 'string', example: 'Silicone' },
            cores_disponiveis: {
              type: 'array',
              items: { type: 'string' },
              example: ['Preto', 'Azul', 'Vermelho'],
            },
            preco: { type: 'number', format: 'float', example: 89.9 },
            estoque: { type: 'integer', example: 50 },
            data_cadastro: { type: 'string', format: 'date-time', example: '2025-10-04T12:00:00Z' },
            garantia_meses: { type: 'integer', example: 12 },
          },
        },

        Produto: {
          type: 'object',
          required: ['id', 'nome', 'preco', 'categoria', 'estoque'],
          properties: {
            id: { type: 'string', example: 'prod-1234-5678' },
            nome: { type: 'string', example: 'Cabo USB-C' },
            imagemUrl: { type: 'string', format: 'uri', example: 'http://localhost:3000/images/cabo-usbc.png' },
            preco: { type: 'number', format: 'float', example: 79.9 },
            categoria: { type: 'string', example: 'Acessório' },
            descricao: { type: 'string', example: 'Cabo USB-C de 1 metro para carregamento rápido.' },
            estoque: { type: 'integer', example: 25 },
          },
        },

        ProdutoFiltro: {
          type: 'object',
          properties: {
            collection: { type: 'string', example: 'Telefones Celulares Novos' },
            price: { 
              type: 'array',
              items: { type: 'string' },
              example: ['Até R$ 500', 'R$ 500 - R$ 1000']
            },
            color: { 
              type: 'array',
              items: { type: 'string' },
              example: ['Preto', 'Azul']
            },
            brand: { 
              type: 'array',
              items: { type: 'string' },
              example: ['Samsung', 'Apple']
            },
            products: { 
              type: 'array',
              items: { type: 'string' },
              example: ['Mais vendidos', 'Lançamentos']
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
