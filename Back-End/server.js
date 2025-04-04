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
import { DatabasePostgresItens } from './services/itens.js'


const server = fastify()

// Obtém o diretório atual corretamente (equivalente a __dirname no ES6)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const databaseProducts = new DatabasePostgresProdutos()
const databaseAuth = new DatabasePostgresAuth() // Instância do serviço de autenticação

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
// Rotas da API de Pedidos
// =========================
const databasePedidos = new DatabasePostgresPedidos();
const databaseItens = new DatabasePostgresItens();

// Criar novo pedido
server.post('/pedidos', { preValidation: [authenticate] }, async (request, reply) => {
    try {
        const pedido = await databasePedidos.create({
            usuario_id: request.user.id_usuario,
            forma_pagamento: request.body.forma_pagamento,
            itens: request.body.itens
        });
        return reply.status(201).send(pedido);
    } catch (error) {
        return reply.status(500).send({ 
            success: false, 
            message: 'Erro ao criar pedido' 
        });
    }
});

// Listar pedidos do usuário
server.get('/pedidos', { preValidation: [authenticate] }, async (request, reply) => {
    try {
        const pedidos = await databasePedidos.list(request.user.id_usuario);
        return { success: true, pedidos };
    } catch (error) {
        return reply.status(500).send({
            success: false,
            message: 'Erro ao listar pedidos'
        });
    }
});

// Detalhes de um pedido específico
server.get('/pedidos/:id', { preValidation: [authenticate] }, async (request, reply) => {
    try {
        const pedido = await databasePedidos.getById(request.params.id);
        
        // Verifica se o pedido pertence ao usuário
        if (pedido.usuario_id !== request.user.id_usuario) {
            return reply.status(403).send({ 
                success: false, 
                message: 'Acesso não autorizado' 
            });
        }
        
        return { success: true, pedido };
    } catch (error) {
        return reply.status(404).send({
            success: false,
            message: 'Pedido não encontrado'
        });
    }
});

// Cancelar pedido
server.put('/pedidos/:id/cancelar', { preValidation: [authenticate] }, async (request, reply) => {
    try {
        const pedido = await databasePedidos.getById(request.params.id);
        
        if (pedido.usuario_id !== request.user.id_usuario) {
            return reply.status(403).send({ 
                success: false, 
                message: 'Acesso não autorizado' 
            });
        }
        
        await databasePedidos.cancel(request.params.id);
        return { success: true, message: 'Pedido cancelado com sucesso' };
    } catch (error) {
        return reply.status(400).send({
            success: false,
            message: 'Erro ao cancelar pedido'
        });
    }
});
  


server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3000,
}, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT ?? 3000}`)
})