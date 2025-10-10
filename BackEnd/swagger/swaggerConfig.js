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
        UsuarioCreate: {
          type: 'object',
          required: ['nome', 'email', 'senha', 'cpf', 'telefone', 'endereco'],
          properties: {
            nome: { type: 'string', example: 'João Silva', description: 'Nome completo do usuário' },
            email: { type: 'string', format: 'email', example: 'joao.silva@example.com', description: 'E-mail usado para login' },
            senha: { type: 'string', example: 'senhaSegura123', description: 'Senha em texto plano (será criptografada antes de salvar)' },
            cpf: { type: 'string', example: '123.456.789-00', description: 'CPF do usuário' },
            telefone: { type: 'string', example: '(11) 98765-4321', description: 'Telefone para contato' },
            endereco: { type: 'string', example: 'Rua das Flores, 123 - São Paulo/SP', description: 'Endereço residencial ou comercial' }
          }
        },
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
            marca: { type: 'string', example: 'Apple' },
            cor: { type: 'string', example: 'Preto' },
            armazenamento: { type: 'string', example: '128GB' },
          },
        },

        ProdutoFiltro: {
          type: 'object',
          properties: {
            preco: { type: 'integer', example: 25 },
            marca: { type: 'string', example: 'Apple' },
            cor: { type: 'string', example: 'Preto' },
            armazenamento: { type: 'string', example: '128GB' },
          },
        },

        Item: {
          type: 'object',
          required: ['id', 'pedido_id', 'produto_id', 'nome', 'quantidade', 'preco_unitario', 'subtotal'],
          properties: {
            id: { type: 'string', example: 'item-1234-5678' },
            pedido_id: { type: 'string', example: 'ped-1234-5678' },
            produto_id: { type: 'string', example: 'prod-1234-5678' },
            nome: { type: 'string', example: 'Cabo USB-C' },
            quantidade: { type: 'integer', example: 2 },
            preco_unitario: { type: 'number', format: 'float', example: 79.9 },
            subtotal: { type: 'number', format: 'float', example: 159.8 },
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
              description: 'Lista de itens incluídos no pedido',
              items: { $ref: '#/components/schemas/Item' },
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

        ItemCreate: {
          type: 'object',
          required: ['id', 'produto_id', 'nome', 'quantidade', 'preco_unitario'],
          properties: {
            id: { type: 'string', format: 'uuid', example: 'item1-uuid-1234' },
            produto_id: { type: 'string', format: 'uuid', example: 'produto-uuid-1111' },
            nome: { type: 'string', example: 'Iphone 15' },
            quantidade: { type: 'integer', example: 2 },
            preco_unitario: { type: 'number', format: 'float', example: 50.00 }
          }
        },
        PedidoCreate: {
          type: 'object',
          required: ['id_pedido', 'id_usuario', 'itens', 'valor_total', 'status', 'data_pedido', 'forma_pagamento'],
          properties: {
            id_pedido: { type: 'string', format: 'uuid', example: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0' },
            id_usuario: { type: 'string', format: 'uuid', example: '595a107c-b797-4a31-96c5-7b662badc251' },
            data_pedido: { type: 'string', format: 'date-time', example: '2025-10-06T23:00:00Z' },
            status: { 
              type: 'string', 
              enum: ['pendente', 'pago', 'enviado', 'entregue', 'cancelado'], 
              example: 'pendente' 
            },
            valor_total: { type: 'number', format: 'float', example: 150.75 },
            forma_pagamento: { type: 'string', example: 'cartao_credito' },
            itens: {
              type: 'array',
              description: 'Lista de itens incluídos no pedido',
              items: { $ref: '#/components/schemas/ItemCreate' }
            }
          }
        },


        /** 🆕 Schema Admin */
        Admin: {
          type: 'object',
          required: ['id_admin', 'nome', 'email', 'senha', 'nivel_acesso'],
          properties: {
            id_admin: { type: 'string', format: 'uuid', example: 'adm-1234-5678' },
            nome: { type: 'string', example: 'Carlos Administrador' },
            email: { type: 'string', example: 'carlos@admin.com' },
            senha: { type: 'string', example: '********' },
            nivel_acesso: { type: 'string', example: 'A', description: 'Nível de acesso do administrador' },
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
