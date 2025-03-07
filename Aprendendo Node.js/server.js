// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('Teste')

//     return response.end()
// })

// server.listen(3000)

import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()

server.get('/', () => {
    return 'Hello Word'
})

server.listen({
    port: 3000,
})