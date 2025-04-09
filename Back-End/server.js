import { fastify } from 'fastify'
import path from 'path'
import { fileURLToPath } from 'url'
import fastifyStatic from '@fastify/static'
import { DatabasePostgresProdutos } from './services/products.js'
import { DatabasePostgresAuth } from './services/auth.js' // Importe o serviço de autenticação
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { DatabasePostgresPedidos } from './services/pedidos.js'


const server = fastify()

// Obtém o diretório atual corretamente (equivalente a __dirname no ES6)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const databaseProducts = new DatabasePostgresProdutos()
const databaseAuth = new DatabasePostgresAuth() // Instância do serviço de autenticação
const databasePedidos = new DatabasePostgresPedidos()

// Configuração JWT
server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'sua-chave-secreta-forte',
    cookie: {
      cookieName: 'token',
      signed: false
    }
  })
  
  server.register(fastifyCookie)
  
  // Configuração CORS atualizada para incluir credenciais
  server.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
  
  // Middleware de autenticação
  const authenticate = async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.code(401).send({ message: 'Não autorizado' })
    }
  }


// Servindo arquivos estáticos da pasta "public"
server.register(fastifyStatic, {
    root: path.join(__dirname, 'src', 'public'), // Caminho atualizado
    prefix: '/public/',
})

// Rota para servir a página home.html
server.get('/', async (request, reply) => {
    return reply.sendFile('home.html', path.join(__dirname, 'src', 'views'))
})

// Rota para servir a página admin.html
server.get('/views/admin', async (request, reply) => {
    return reply.sendFile('admin.html', path.join(__dirname, 'src', 'views'))
})

// =========================
// Rotas da API de Produtos
// =========================

server.get('/produtos', async (request) => {
    const { search, category } = request.query // Extrai ambos os parâmetros
    const produtos = await databaseProducts.list(search, category) // Passa os dois para o método
    return produtos
})

server.post('/produtos', async (request, response) => {
    const { nome, imagemUrl, preco, categoria,descricao, estoque } = request.body;

    try {
        const produto = await databaseProducts.create({
            nome,
            imagemUrl,
            preco,
            categoria,
            descricao,
            estoque
        })

        return response.status(201).send(produto)
    } catch {
        return response.status(500).send({ mensagem: 'Erro ao criar produto' })
    }
})

server.put('/produtos/:id', async (request, reply) => {
    const id = request.params.id
    const { nome, imagemUrl, preco, categoria, descricao, estoque } = request.body

    await databaseProducts.update(id, {
        nome,
        imagemUrl,
        preco,
        categoria,
        descricao,
        estoque
    });

    return reply.status(200).send({
        sucess: true,
        message: 'Produto atualizado com sucesso!'
    })
});

server.delete('/produtos/:id', async (request, reply) => {
    const id = request.params.id

    await databaseProducts.delete(id)

    return reply.status(204).send()
});

// =========================
// Rotas de pedidos
// ========================= 

// Criar novo pedido com itens
server.post('/pedidos', async (request, reply) => {
  try {
    // Obtém os dados do corpo da requisição
    const { usuario_id, itens, forma_pagamento, total } = request.body;
    
    // Validação básica
    if (!usuario_id || !itens || !Array.isArray(itens) || itens.length === 0) {
      return reply.status(400).send({ 
        message: 'Dados incompletos: usuario_id e itens são obrigatórios' 
      });
    }

    // Chama o método para criar o pedido
    const novoPedido = await databasePedidos.create({
      usuario_id,
      itens,
      forma_pagamento,
      total,
      status: 'pendente' // status inicial
    });
    
    return reply.status(201).send(novoPedido);
    
  } catch (error) {
    console.error('Erro na rota POST /pedidos:', error);
    return reply.status(500).send({ 
      message: 'Erro ao criar pedido',
      details: error.message 
    });
  }
});

// Listar todos os pedidos
server.get('/pedidos', async (request, reply) => {
  try {
      // Obtém os query parameters
      const { usuario_id, status } = request.query;
      
      // Validação básica
      if (!usuario_id) {
          return reply.status(400).send({ message: 'O parâmetro usuario_id é obrigatório' });
      }

      
      // Chama o método listar com os parâmetros
      const pedidos = await databasePedidos.listar(usuario_id, status);
      return reply.send(pedidos);
      
  } catch (error) {
      console.error('Erro na rota /pedidos:', error);
      return reply.status(500).send({ 
          message: 'Erro ao listar pedidos',
          details: error.message 
      });
  }
});

// Obter detalhes de um pedido específico (com itens)
server.get('/pedidos/:id', async (request, reply) => {
  try {
      const pedido = await databasePedidos.buscarPorId(request.params.id);
      return reply.send(pedido);
  } catch (error) {
      return reply.status(404).send({ message: 'Pedido não encontrado' });
  }
});

server.patch('/pedidos/:id/status', async (request, reply) => {
  try {
      // 1. Extração dos parâmetros
      const { id } = request.params;
      const { status } = request.body;

      // 2. Validações básicas
      if (!id) {
          return reply.status(400).send({
              error: 'missing_parameter',
              message: 'ID do pedido é obrigatório na URL',
              example: 'PATCH /pedidos/:id/status'
          });
      }

      if (!status) {
          return reply.status(400).send({
              error: 'missing_parameter',
              message: 'O novo status é obrigatório no body',
              example: { "status": "novo_status" }
          });
      }

      // 3. Validação do formato do UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(id)) {
          return reply.status(400).send({
              error: 'invalid_id_format',
              message: 'O ID deve estar no formato UUID v4',
              received: id,
              example: 'cfbd0f46-9fe9-4d0d-891f-d0261dea6c0e'
          });
      }

      // 4. Validação do status (opcional - ajuste conforme seus status válidos)
      const statusValidos = ['pendente', 'processando', 'concluido', 'cancelado'];
      if (!statusValidos.includes(status)) {
          return reply.status(400).send({
              error: 'invalid_status',
              message: 'Status fornecido é inválido',
              received: status,
              valid_statuses: statusValidos
          });
      }

      // 5. Atualização no banco de dados
      const atualizado = await databasePedidos.atualizarStatus(id, status);
      
      if (!atualizado) {
          return reply.status(404).send({
              error: 'not_found',
              message: 'Pedido não encontrado',
              pedido_id: id
          });
      }

      // 6. Resposta de sucesso
      return reply.send({
          success: true,
          message: 'Status do pedido atualizado com sucesso',
          pedido_id: id,
          novo_status: status
      });

  } catch (error) {
      console.error(`Erro ao atualizar status do pedido ${request.params.id}:`, {
          error: error.message,
          stack: error.stack,
          body: request.body
      });
      
      return reply.status(500).send({
          error: 'update_error',
          message: 'Erro ao atualizar status do pedido',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
});

// Cancelar pedido (muda status)
server.put('/pedidos/:id/cancelar', async (request, reply) => {
  try {
      await databasePedidos.cancel(request.params.id);
      return reply.send({ message: 'Pedido cancelado com sucesso' });
  } catch (error) {
      return reply.status(500).send({ message: 'Erro ao cancelar pedido' });
  }
});

// Deletar pedido permanentemente (e itens por CASCADE)
server.delete('/pedidos/:id', async (request, reply) => {
  try {
      await databasePedidos.deletar(request.params.id);
      return reply.status(204).send();
  } catch (error) {
      return reply.status(500).send({ message: 'Erro ao deletar pedido' });
  }
});

// Adicionar item a pedido existente
// server.post('/pedidos/:id/itens', async (request, reply) => {
//   try {
//       const item = await databaseItens.create({
//           pedido_id: request.params.id,
//           ...request.body
//       });
//       // Atualiza total do pedido
//       const total = await databaseItens.calcularTotalPedido(request.params.id);
//       await databasePedidos.atualizarTotal(request.params.id, total);
//       return reply.status(201).send(item);
//   } catch (error) {
//       return reply.status(400).send({ message: error.message });
//   }
// });

// Remover item específico de um pedido
// server.delete('/pedidos/:pedidoId/itens/:itemId', async (request, reply) => {
//   try {
//       await databaseItens.delete(request.params.itemId);
//       // Atualiza total do pedido
//       const total = await databaseItens.calcularTotalPedido(request.params.pedidoId);
//       await databasePedidos.atualizarTotal(request.params.pedidoId, total);
//       return reply.status(204).send();
//   } catch (error) {
//       return reply.status(500).send({ message: 'Erro ao remover item' });
//   }
// });

// =========================
// Rotas da API de Autenticação
// ========================= 

server.post('/api/auth/register', async (request, reply) => {
    try {
      const user = await databaseAuth.register(request.body)
      const token = server.jwt.sign({
        id_usuario: user.id_usuario,
        email: user.email
      })
      
      reply.setCookie('token', token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400 // 1 dia
      })
      
      return { 
        success: true, 
        user: {
          id_usuario: user.id_usuario,
          nome: user.nome,
          email: user.email,
          data_cadastro: user.data_cadastro
        }
      }
    } catch (error) {
      return reply.status(400).send({ 
        success: false, 
        message: error.message 
      })
    }
  })
  
  server.post('/api/auth/login', async (request, reply) => {
    const { email, senha } = request.body
    
    try {
      const user = await databaseAuth.login(email, senha)
      const token = server.jwt.sign({
        id_usuario: user.id_usuario,
        email: user.email
      })
      
      reply.setCookie('token', token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400 // 1 dia
      })
      
      return { success: true, user }
    } catch (error) {
      return reply.status(401).send({ 
        success: false, 
        message: error.message 
      })
    }
  })


  server.get('/api/auth/verify', async (request, reply) => {
    try {
        // O token está no cookie, não precisa pegar do header
        const token = request.cookies.token;
        
        if (!token) {
            return reply.status(401).send({ valid: false });
        }

        const decoded = server.jwt.verify(token);
        const user = await databaseAuth.getUserById(decoded.id_usuario);
        
        if (!user) {
            return reply.status(401).send({ valid: false });
        }

        return { valid: true, user };
    } catch (error) {
        return reply.status(401).send({ valid: false });
    }
});
  
// =========================
// Rotas CRUD para Usuários (Protegidas)
// =========================
  
  // CREATE - Criar usuário (já implementado no /api/auth/register)
  
  // READ - Listar usuários (apenas admin)
  server.get('/api/usuarios', { preValidation: [authenticate] }, async (request, reply) => {
    try {
      // Em um sistema real, verifique se o usuário é admin
      // if (request.user.role !== 'admin') {
      //   return reply.status(403).send({ message: 'Acesso não autorizado' })
      // }
      
      const usuarios = await sql`
        SELECT id_usuario, nome, email, cpf, telefone, data_cadastro 
        FROM usuarios
      `
      return { success: true, usuarios }
    } catch (error) {
      return reply.status(500).send({
        success: false,
        message: 'Erro ao listar usuários'
      })
    }
  })
  
  // READ - Obter usuário específico
  server.get('/api/usuarios/:id', { preValidation: [authenticate] }, async (request, reply) => {
    try {
      const { id } = request.params
      const usuario = await databaseAuth.getUserById(id)
      
      // Verificar se o usuário solicitado é o mesmo que está logado ou se é admin
      // if (request.user.id_usuario !== id && request.user.role !== 'admin') {
      //   return reply.status(403).send({ message: 'Acesso não autorizado' })
      // }
      
      return { success: true, usuario }
    } catch (error) {
      return reply.status(404).send({
        success: false,
        message: error.message
      })
    }
  })
  
  // UPDATE - Atualizar usuário
  server.put('/api/usuarios/:id', { preValidation: [authenticate] }, async (request, reply) => {
    try {
      const { id } = request.params
      const updateData = request.body
      
      // Verificar se o usuário está atualizando seu próprio perfil ou se é admin
      // if (request.user.id_usuario !== id && request.user.role !== 'admin') {
      //   return reply.status(403).send({ message: 'Acesso não autorizado' })
      // }
      
      const updatedUser = await databaseAuth.updateUser(id, updateData)
      return { success: true, usuario: updatedUser }
    } catch (error) {
      return reply.status(400).send({
        success: false,
        message: error.message
      })
    }
  })
  
  // DELETE - Remover usuário
  server.delete('/api/usuarios/:id', { preValidation: [authenticate] }, async (request, reply) => {
    try {
      const { id } = request.params
      
      // Verificar se o usuário é admin
      // if (request.user.role !== 'admin') {
      //   return reply.status(403).send({ message: 'Acesso não autorizado' })
      // }
      
      await databaseAuth.deleteUser(id)
      return { success: true, message: 'Usuário removido com sucesso' }
    } catch (error) {
      return reply.status(400).send({
        success: false,
        message: error.message
      })
    }
  })
  
  // Rota para obter dados do usuário logado
  server.get('/api/auth/me', { preValidation: [authenticate] }, async (request, reply) => {
    try {
      const user = await databaseAuth.getUserById(request.user.id_usuario)
      return { success: true, user }
    } catch (error) {
      return reply.status(404).send({ 
        success: false, 
        message: error.message 
      })
    }
  })
  
  // Rota para logout
  server.post('/api/auth/logout', { preValidation: [authenticate] }, async (request, reply) => {
    reply.clearCookie('token')
    return { success: true, message: 'Logout realizado com sucesso' }
  })

// =========================

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3000,
}, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT ?? 3000}`)
})