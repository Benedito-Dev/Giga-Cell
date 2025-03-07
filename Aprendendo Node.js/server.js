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

server.get('/itens', () => {
    const videos = database.list()

    return videos
})

server.post('/itens', (request, response) => {
    const { Produto, Preco, Unidade } = request.body

    database.create({
        Produto,
        Preco,
        Unidade
    })

    console.log(database)

    return response.status(201).send()
})

server.put('/itens:id', () => {
    return 'Hello Word'
})

server.delete('/itens:id', () => {
    return 'Hello Word'
})

server.listen({
    port: 3000,
})