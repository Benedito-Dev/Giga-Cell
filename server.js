// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('Teste')

//     return response.end()
// })

// server.listen(3000)

import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

const database = new DatabasePostgres()

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

    await database.updade(itemId, {
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
})