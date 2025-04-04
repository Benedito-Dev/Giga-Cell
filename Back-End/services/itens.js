import { randomUUID } from 'node:crypto';
import { sql } from '../config/db.js';

export class DatabasePostgresItens {
    // Listar itens de um pedido específico
    async list(pedidoId) {
        const itens = await sql`
            SELECT i.*, p.nome, p.imagemUrl 
            FROM itens i
            JOIN produtos p ON i.produto_id = p.id
            WHERE i.pedido_id = ${pedidoId}
        `;
        return itens;
    }

    // Adicionar item a um pedido
    async create(item) {
        const { 
            pedido_id,
            produto_id,
            quantidade,
            preco_unitario
        } = item;
        
        const id = randomUUID();

        try {
            await sql`
                INSERT INTO itens (
                    id, pedido_id, produto_id, quantidade, preco_unitario
                ) 
                VALUES (
                    ${id}, ${pedido_id}, ${produto_id}, ${quantidade}, ${preco_unitario}
                )
            `;
            
            console.log('Item adicionado com sucesso!');
            return { id, ...item, subtotal: quantidade * preco_unitario };
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
            return false;
        }
    }

    // Atualizar item
    async update(id, item) {
        const { 
            quantidade,
            preco_unitario
        } = item;

        await sql`
            UPDATE itens 
            SET 
                quantidade = ${quantidade},
                preco_unitario = ${preco_unitario}
            WHERE id = ${id}
        `;
        
        return true;
    }

    // Remover item
    async delete(id) {
        await sql`DELETE FROM itens WHERE id = ${id}`;
        return true;
    }

    // Remover todos itens de um pedido
    async deleteByPedido(pedidoId) {
        await sql`DELETE FROM itens WHERE pedido_id = ${pedidoId}`;
        return true;
    }
}
