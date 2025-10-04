const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API Node com Swagger',
      version: '1.0.0',
      description: 'Documentação da API com Swagger',
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
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Celular: {
          type: 'object',
          required: ['id', 'marca', 'modelo', 'sistema_operacional', 'armazenamento_gb', 'ram_gb', 'preco', 'lancamento', 'estoque'],
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
            estoque: { type: 'integer', example: 15 }
          }
        },
        Acessorio : {
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
                example: ['Galaxy S21', 'Galaxy S21 Plus']
                },
                imagemUrl: { type: 'string', format: 'uri', example: 'http://localhost:3000/images/capa-galaxy-s21.png' },
                material: { type: 'string', example: 'Silicone' },
                cores_disponiveis: { 
                type: 'array', 
                items: { type: 'string' },
                example: ['Preto', 'Azul', 'Vermelho'] 
                },
                preco: { type: 'number', format: 'float', example: 89.90 },
                estoque: { type: 'integer', example: 50 },
                data_cadastro: { type: 'string', format: 'date-time', example: '2025-10-04T12:00:00Z' },
                garantia_meses: { type: 'integer', example: 12 }
            }
        }
      }
    },
    security: [
      { bearerAuth: [] }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
