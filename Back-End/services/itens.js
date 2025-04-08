import { randomUUID } from 'node:crypto';
import { sql } from '../config/db.js';

// Função para inicializar a tabela (executar uma vez no startup)
export async function initItens() {
    await sql`
        CREATE TABLE IF NOT EXISTS itens (
            id TEXT PRIMARY KEY,
            pedido_id TEXT NOT NULL,
            produto_id TEXT NOT NULL,
            quantidade INTEGER NOT NULL,
            preco_unitario DECIMAL(10, 2) NOT NULL,
            subtotal DECIMAL(10, 2) GENERATED ALWAYS AS (quantidade * preco_unitario) STORED,
            FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
            FOREIGN KEY (produto_id) REFERENCES produtos(id)
        )
    `;
    console.log('Tabela itens verificada/criada com sucesso');
}

// Listar itens de um pedido específico
export async function listItens(pedidoId) {
    const itens = await sql`
        SELECT 
            i.id, 
            i.pedido_id, 
            i.produto_id, 
            i.quantidade, 
            i.preco_unitario, 
            i.subtotal,
            p.nome as produto_nome,
            p.imagemUrl as produto_imagem
        FROM itens i
        JOIN produtos p ON i.produto_id = p.id
        WHERE i.pedido_id = ${pedidoId}
    `;
    return itens;
}

// Adicionar item a um pedido
export async function createItem(item) {
    const { pedido_id, produto_id, quantidade, preco_unitario } = item;
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
        
        // Retorna o item criado com todas as informações
        const [itemCriado] = await sql`
            SELECT 
                i.*,
                p.nome as produto_nome,
                p.imagemUrl as produto_imagem
            FROM itens i
            JOIN produtos p ON i.produto_id = p.id
            WHERE i.id = ${id}
        `;
        
        return itemCriado;
    } catch (error) {
        console.error('Erro ao adicionar item:', error);
        throw error;
    }
}

// Atualizar item
export async function updateItem(id, item) {
    const { quantidade, preco_unitario } = item;

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
export async function deleteItem(id) {
    await sql`DELETE FROM itens WHERE id = ${id}`;
    return true;
}

// Remover todos itens de um pedido
export async function deleteItensByPedido(pedidoId) {
    await sql`DELETE FROM itens WHERE pedido_id = ${pedidoId}`;
    return true;
}

// Calcular total do pedido baseado nos itens
export async function calcularTotalPedido(pedidoId) {
    const result = await sql`
        SELECT SUM(subtotal) as total 
        FROM itens 
        WHERE pedido_id = ${pedidoId}
    `;
    return result[0]?.total || 0;
}