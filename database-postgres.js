import { randomUUID } from 'node:crypto'
import { sql } from './db.js'

export class DatabasePostgres {
    #items = new Map()

    async list(search) {
        let videos

        if (search) {
            videos = await sql`select * from produtos where produto ilike ${'%' + search + '%'}`
        } else {
            videos = await sql`select * from produtos`
        }

        return videos
    }

    async create(item) {
        const itemID = randomUUID()
        const {Produto, Preco, Unidade} = item

        await sql`insert into produtos (id, produto, preco, unidade) VALUES (${itemID}, ${Produto}, ${Preco}, ${Unidade})`
    }

    async updade(id, item) {
        const {Produto, Preco, Unidade} = item

        await sql`update produtos set produto = ${Produto}, preco = ${Preco}, unidade = ${Unidade} WHERE id = ${id}`

    }

    async delete(id) {
        await sql`DELETE FROM produtos WHERE id = ${id}`
    }
}