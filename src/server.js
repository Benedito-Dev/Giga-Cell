
import { fastify } from 'fastify'
import path from 'path'
import { fileURLToPath } from 'url'
import fastifyStatic from '@fastify/static'
import { DatabasePostgres } from './services/database-postgres.js'

const server = fastify()

// Obtém o diretório atual corretamente (equivalente a __dirname no ES6)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const database = new DatabasePostgres()

// Servindo arquivos estáticos da pasta "public"
server.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // Arquivos podem ser acessados via /public/
})

// Rota para servir a página home.html
server.get('/', async (request, reply) => {
    return reply.sendFile('home.html', path.join(__dirname, 'views'))
})

// Rota para servir a página admin.html
server.get('/views/admin', async (request, reply) => {
    return reply.sendFile('admin.html', path.join(__dirname, 'views'))
})

// =========================
// Rotas da API de itens
// =========================

server.get('/itens', async (request) => { // Get Concluido
    const search = request.query.search

    const videos = await database.list(search)

    return videos
})

server.post('/itens', async (request, response) => { // Post Concluido
    const { Produto, Preco, Unidade } = request.body

    await database.create({
        Produto,
        Preco,
        Unidade
    })

    console.log(database)

    return response.status(201).send()
})

server.put('/itens/:id', async (request, response) => { // Put Concluido
    const itemId = request.params.id
    const { Produto, Preco, Unidade } = request.body

    await database.update(itemId, {
        Produto,
        Preco,
        Unidade
    })

    return response.status(204)
})

server.delete('/itens/:id', async (request) => {
    const itemId = request.params.id

    await database.delete(itemId)

    return response.status(204)
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3000,
}, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT ?? 3000}`)
})