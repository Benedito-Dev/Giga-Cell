import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
    #items = new Map()

    list(search) {
        return Array.from(this.#items.entries()).map((arrayitens) => {
            const id = arrayitens[0]
            const data = arrayitens[1]

            return {
                id,
                ...data
            }
        }).filter(item => {
            if (search) {
                return item.Produto.includes(search)
            }
            return true
        })
    }

    create(item) {
        const ItemId = randomUUID()

        this.#items.set(ItemId, item)
    }

    updade(id, item) {
        this.#items.set(id, item)
    }

    delete(id) {
        this.#items.delete(id)
    }

    delete(id) {
        this.#items.delete(id)
    }
}