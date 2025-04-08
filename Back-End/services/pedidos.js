import { randomUUID } from 'node:crypto';
import { sql } from '../config/db.js';

export class DatabasePostgresPedidos {
    constructor() {
        this.initialize().catch(err => {
            console.error('Erro na inicialização da tabela pedidos:', err);
            throw err;
        });
    }

    async initialize() {
        try {
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
        } catch (error) {
            console.error('Erro ao criar tabela pedidos:', error);
            throw error;
        }
    }

    async criar(pedidoData) {
        const { usuario_id, forma_pagamento, itens = [] } = pedidoData;
        const id = randomUUID();
        
        try {
            await sql.begin(async sql => {
                // Cria o pedido
                await sql`
                    INSERT INTO pedidos (id, usuario_id, forma_pagamento, total)
                    VALUES (${id}, ${usuario_id}, ${forma_pagamento}, 0)
                `;

                // Insere os itens diretamente
                for (const item of itens) {
                    await sql`
                        INSERT INTO itens_pedido (
                            id, pedido_id, produto_id, quantidade, preco_unitario
                        ) VALUES (
                            ${randomUUID()}, ${id}, ${item.produto_id}, 
                            ${item.quantidade}, ${item.preco_unitario}
                        )
                    `;
                }

                // Calcula o total
                const [{ total }] = await sql`
                    SELECT SUM(quantidade * preco_unitario) as total
                    FROM itens_pedido
                    WHERE pedido_id = ${id}
                `;

                // Atualiza o pedido com o total
                await sql`
                    UPDATE pedidos SET total = ${total} 
                    WHERE id = ${id}
                `;
            });

            return await this.buscarPorId(id);
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            throw new Error('Falha ao criar pedido. Verifique os dados e tente novamente.');
        }
    }

    async listar(usuarioId, status) {
        try {
            const pedidos = await sql`
                SELECT * FROM pedidos 
                WHERE usuario_id = ${usuarioId}
                ${status ? sql`AND status = ${status}` : sql``}
                ORDER BY data DESC
            `;

            // Busca os itens para cada pedido
            for (const pedido of pedidos) {
                pedido.itens = await sql`
                    SELECT 
                        ip.*,
                        p.nome as produto_nome,
                        p.imagemUrl as produto_imagem
                    FROM itens_pedido ip
                    JOIN produtos p ON ip.produto_id = p.id
                    WHERE ip.pedido_id = ${pedido.id}
                `;
            }

            return pedidos;
        } catch (error) {
            console.error('Erro ao listar pedidos:', error);
            throw new Error('Falha ao buscar pedidos.');
        }
    }

    async buscarPorId(id) {
        try {
            const [pedido] = await sql`SELECT * FROM pedidos WHERE id = ${id}`;
            if (!pedido) return null;

            pedido.itens = await sql`
                SELECT 
                    ip.*,
                    p.nome as produto_nome,
                    p.imagemUrl as produto_imagem
                FROM itens_pedido ip
                JOIN produtos p ON ip.produto_id = p.id
                WHERE ip.pedido_id = ${id}
            `;
            
            return pedido;
        } catch (error) {
            console.error('Erro ao buscar pedido:', error);
            throw new Error('Falha ao buscar pedido.');
        }
    }

    async atualizarStatus(id, novoStatus) {
        try {
            const { count } = await sql`
                UPDATE pedidos 
                SET status = ${novoStatus} 
                WHERE id = ${id}
            `;
            return count > 0;
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
            throw new Error('Falha ao atualizar status do pedido.');
        }
    }

    async cancelar(id) {
        return this.atualizarStatus(id, 'cancelado');
    }

    async deletar(id) {
        try {
            await sql.begin(async sql => {
                // Primeiro deleta os itens
                await sql`DELETE FROM itens_pedido WHERE pedido_id = ${id}`;
                // Depois deleta o pedido
                await sql`DELETE FROM pedidos WHERE id = ${id}`;
            });
            return true;
        } catch (error) {
            console.error('Erro ao deletar pedido:', error);
            throw new Error('Falha ao deletar pedido.');
        }
    }
}