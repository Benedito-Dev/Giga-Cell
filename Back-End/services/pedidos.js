import { randomUUID } from 'node:crypto';
import { sql } from '../config/db.js';
import { DatabasePostgresItens } from './itens.js';

export class DatabasePostgresPedidos {
    constructor() {
        this.itensDatabase = new DatabasePostgresItens();
        this.init().catch(err => console.error('Erro ao inicializar tabelas:', err));
    }

    async init() {
        // Cria a tabela pedidos primeiro
        await sql`
            CREATE TABLE IF NOT EXISTS pedidos (
                id TEXT PRIMARY KEY,
                usuario_id TEXT NOT NULL,
                data TIMESTAMP NOT NULL DEFAULT NOW(),
                status TEXT NOT NULL DEFAULT 'pendente',
                total DECIMAL(10, 2) NOT NULL DEFAULT 0,
                forma_pagamento TEXT NOT NULL,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
            )
        `;
        console.log('Tabela pedidos verificada/criada com sucesso');
    }

    // Criar um novo pedido com itens
    async create(pedidoData) {
        const {
            usuario_id,
            forma_pagamento,
            itens = []
        } = pedidoData;
        
        const id = randomUUID();
        const data = new Date().toISOString();
        const status = 'pendente';

        try {
            // Inicia uma transação
            await sql.begin(async sql => {
                // Primeiro cria o pedido
                await sql`
                    INSERT INTO pedidos (
                        id, usuario_id, data, status, forma_pagamento, total
                    ) VALUES (
                        ${id}, ${usuario_id}, ${data}, ${status}, ${forma_pagamento}, 0
                    )
                `;

                // Adiciona os itens usando a classe de itens
                for (const item of itens) {
                    await this.itensDatabase.create({
                        ...item,
                        pedido_id: id
                    }, sql);
                }

                // Calcula o total do pedido
                const total = await this.itensDatabase.calcularTotalPedido(id, sql);
                
                // Atualiza o pedido com o total calculado
                await sql`
                    UPDATE pedidos 
                    SET total = ${total} 
                    WHERE id = ${id}
                `;
            });

            return this.getById(id);
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            throw error;
        }
    }

    // Listar pedidos de um usuário
    async list(usuarioId) {
        const pedidos = await sql`
            SELECT * FROM pedidos 
            WHERE usuario_id = ${usuarioId}
            ORDER BY data DESC
        `;
        
        // Para cada pedido, buscar os itens
        const pedidosComItens = await Promise.all(
            pedidos.map(async pedido => ({
                ...pedido,
                itens: await this.itensDatabase.list(pedido.id)
            }))
        );
        
        return pedidosComItens;
    }

    // Buscar pedido por ID
    async getById(pedidoId) {
        const [pedido] = await sql`SELECT * FROM pedidos WHERE id = ${pedidoId}`;
        if (!pedido) return null;

        const itens = await this.itensDatabase.list(pedido.id);
        return { ...pedido, itens };
    }

    // Cancelar pedido
    async cancel(pedidoId) {
        await sql`
            UPDATE pedidos 
            SET status = 'cancelado' 
            WHERE id = ${pedidoId}
        `;
        return true;
    }

    // Atualizar status do pedido
    async updateStatus(pedidoId, novoStatus) {
        await sql`
            UPDATE pedidos 
            SET status = ${novoStatus} 
            WHERE id = ${pedidoId}
        `;
        return true;
    }
}

export { DatabasePostgresPedidos };