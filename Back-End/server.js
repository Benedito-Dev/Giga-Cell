import { fastify } from 'fastify'
import path from 'path'
import { fileURLToPath } from 'url'
import fastifyStatic from '@fastify/static'
import { DatabasePostgres } from './services/database-postgres.js'
import { DatabasePostgresAcessorios } from './services/acessorios.js'
import { DatabasePostgresProdutos } from './services/products.js'
import fastifyCors from '@fastify/cors'



const server = fastify()

// Obtém o diretório atual corretamente (equivalente a __dirname no ES6)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const databaseProducts = new DatabasePostgresProdutos()

const databaseCelulares = new DatabasePostgres()
const databaseAcessorios = new DatabasePostgresAcessorios()

// Servindo arquivos estáticos da pasta "public"
server.register(fastifyStatic, {
    root: path.join(__dirname, 'src', 'public'), // Caminho atualizado
    prefix: '/public/',
})

server.register(fastifyCors, {
    origin: true, // Permite todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// Rota para servir a página home.html
server.get('/', async (request, reply) => {
    return reply.sendFile('home.html', path.join(__dirname, 'src', 'views'))
})

// Rota para servir a página admin.html
server.get('/views/admin', async (request, reply) => {
    return reply.sendFile('admin.html', path.join(__dirname, 'src', 'views'))
})

// =========================
// Rotas da API de celulares
// =========================

server.get('/produtos', async (request) => {
    const { search, category } = request.query // Extrai ambos os parâmetros
    const produtos = await databaseProducts.list(search, category) // Passa os dois para o método
    return produtos
})

// =========================
// Rotas da API de acessórios
// =========================

server.get('/acessorios', async (request) => {
    const search = request.query.search
    const acessorios = await databaseAcessorios.list(search)
    return acessorios
})

server.post('/acessorios', async (request, response) => {
    const { 
        nome, 
        tipo, 
        marca, 
        compatibilidade, 
        imagemUrl, 
        material, 
        cores_disponiveis, 
        preco, 
        estoque, 
        garantia_meses 
    } = request.body

    await databaseAcessorios.create({
        nome,
        tipo,
        marca,
        compatibilidade,
        imagemUrl,
        material,
        cores_disponiveis,
        preco,
        estoque,
        garantia_meses
    })

    return response.status(201).send()
})

server.put('/acessorios/:id', async (request, response) => {
    const acessorioId = request.params.id
    const { 
        nome, 
        tipo, 
        marca, 
        compatibilidade, 
        imagemUrl, 
        material, 
        cores_disponiveis, 
        preco, 
        estoque, 
        garantia_meses 
    } = request.body

    await databaseAcessorios.update(acessorioId, {
        nome,
        tipo,
        marca,
        compatibilidade,
        imagemUrl,
        material,
        cores_disponiveis,
        preco,
        estoque,
        garantia_meses
    })

    return response.status(204).send()
})

server.delete('/acessorios/:id', async (request, response) => {
    const acessorioId = request.params.id
    await databaseAcessorios.delete(acessorioId)
    return response.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3000,
}, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT ?? 3000}`)
})