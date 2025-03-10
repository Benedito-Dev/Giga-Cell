// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('Teste')

//     return response.end()
// })

// server.listen(3000)

import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()

const database = new DatabaseMemory()

server.get('/itens', (request) => { // Get Concluido
    const search = request.query.search

    const videos = database.list(search)

    return videos
})

server.post('/itens', (request, response) => { // Post Concluido
    const { Produto, Preco, Unidade } = request.body

    database.create({
        Produto,
        Preco,
        Unidade
    })

    console.log(database)

    return response.status(201).send()
})

server.put('/itens/:id', (request, response) => { // Put Concluido
    const itemId = request.params.id
    const { Produto, Preco, Unidade } = request.body

    database.updade(itemId, {
        Produto,
        Preco,
        Unidade
    })

    return response.status(204)
})

server.delete('/itens/:id', (request) => {
    const itemId = request.params.id

    database.delete(itemId)

    return response.status(204)
})

server.listen({
    port: 3000,
})