import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
    #items = new Map

    list() {
        return Array.from(this.#items.values())
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