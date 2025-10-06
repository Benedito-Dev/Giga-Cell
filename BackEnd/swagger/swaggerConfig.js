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
        Usuario: {
          type: 'object',
          required: ['id_usuario', 'nome', 'email', 'senha', 'cpf'],
          properties: {
            id_usuario: { type: 'string', format: 'uuid', example: '595a107c-b797-4a31-96c5-7b662badc251' },
            nome: { type: 'string', example: 'Benedito Bittencourt' },
            email: { type: 'string', example: 'benedito@gmail.com' },
            senha: { type: 'string', example: '********' },
            cpf: { type: 'string', example: '22429748740' },
            telefone: { type: 'string', example: '85988640696' },
            endereco: { type: 'string', example: 'Rua Lucas Maia, 107 - Passaré' },
            data_cadastro: { type: 'string', format: 'date-time', example: '2025-04-10T21:55:49.592Z' },
          },
        },
        Pedido: {
          type: 'object',
          required: ['id_pedido', 'id_usuario', 'itens', 'valor_total', 'status', 'data_pedido'],
          properties: {
            id_pedido: { type: 'string', format: 'uuid', example: 'ped-1234-5678' },
            id_usuario: { type: 'string', format: 'uuid', example: 'usr-9999-8888' },
            itens: {
              type: 'array',
              description: 'Lista de produtos do pedido',
              items: {
                type: 'object',
                properties: {
                  id_produto: { type: 'string', example: 'prod-1234-5678' },
                  nome: { type: 'string', example: 'Cabo USB-C' },
                  quantidade: { type: 'integer', example: 2 },
                  preco_unitario: { type: 'number', format: 'float', example: 79.9 },
                },
              },
            },
            valor_total: { type: 'number', format: 'float', example: 159.8 },
            status: {
              type: 'string',
              enum: ['pendente', 'pago', 'enviado', 'entregue', 'cancelado'],
              example: 'pago',
            },
            data_pedido: { type: 'string', format: 'date-time', example: '2025-10-05T15:30:00Z' },
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
