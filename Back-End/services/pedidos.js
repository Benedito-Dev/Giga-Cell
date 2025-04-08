import { randomUUID } from 'node:crypto';
import { sql } from '../config/db.js';

export class DatabasePostgresPedidos {
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
            
            await sql`
                CREATE TABLE IF NOT EXISTS itens_pedido (
                    id TEXT PRIMARY KEY,
                    pedido_id TEXT NOT NULL,
                    produto_id TEXT NOT NULL,
                    quantidade INTEGER NOT NULL,
                    preco_unitario DECIMAL(10, 2) NOT NULL,
                    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
                    FOREIGN KEY (produto_id) REFERENCES produtos(id)
                )
            `;
            
            console.log('Tabelas pedidos e itens_pedido verificadas/criadas com sucesso');
        } catch (error) {
            console.error('Erro ao criar tabelas:', error);
            throw error;
        }
    }

    async create(pedidoData) {
        console.log('Dados recebidos no create:', JSON.stringify(pedidoData, null, 2));
        
        const { usuario_id, forma_pagamento, itens = [] } = pedidoData;
        const id = randomUUID();
        
        try {
            // Verificação dos itens
            itens.forEach((item, index) => {
                if (typeof item.preco_unitario !== 'number' || item.preco_unitario <= 0) {
                    throw new Error(`Item ${index + 1}: preco_unitario deve ser um número positivo`);
                }
                if (!Number.isInteger(item.quantidade) || item.quantidade <= 0) {
                    throw new Error(`Item ${index + 1}: quantidade deve ser um inteiro positivo`);
                }
            });
    
            // 1. Cria o pedido
            await sql`
                INSERT INTO pedidos (id, usuario_id, forma_pagamento, total)
                VALUES (${id}, ${usuario_id}, ${forma_pagamento}, 0)
            `;
    
            // 2. Insere os itens (usando a tabela 'items')
            for (const item of itens) {
                console.log('Inserindo item:', item);
                const itemId = randomUUID();
                await sql`
                    INSERT INTO items 
                    (id, pedido_id, produto_id, quantidade, preco_unitario)
                    VALUES (${itemId}, ${id}, ${item.produto_id}, ${item.quantidade}, ${item.preco_unitario})
                `;
                
                // O subtotal é calculado automaticamente pelo banco (STORED GENERATED)
            }
    
            // 3. Calcula e atualiza o total (usando a tabela 'items')
            const totalResult = await sql`
                SELECT SUM(subtotal) as total
                FROM items
                WHERE pedido_id = ${id}
            `;
            
            const total = totalResult[0]?.total || 0;
            
            await sql`
                UPDATE pedidos SET total = ${total} 
                WHERE id = ${id}
            `;
    
            return "Pedido criado com sucesso!";
        } catch (error) {
            console.error('Erro na criação do pedido:', error);
            throw new Error('Falha ao criar pedido. Verifique os dados e tente novamente.');
        }
    }

    async listar(usuarioId, status) {
        try {
            let pedidos;
    
            if (usuarioId && status) {
                // Caso 1: Filtro por usuário E status
                pedidos = await sql`
                    SELECT * FROM pedidos 
                    WHERE usuario_id = ${usuarioId}
                    AND status = ${status}
                    ORDER BY data DESC
                `;
            } 
            else if (usuarioId) {
                // Caso 2: Filtro apenas por usuário
                pedidos = await sql`
                    SELECT * FROM pedidos 
                    WHERE usuario_id = ${usuarioId}
                    ORDER BY data DESC
                `;
            }
            else {
                // Caso 3: Sem filtros (não deveria ocorrer pela validação da rota)
                pedidos = await sql`
                    SELECT * FROM pedidos 
                    ORDER BY data DESC
                    LIMIT 100
                `;
            }
    
            // Carrega os itens para cada pedido (otimizado)
            if (pedidos && pedidos.length > 0) {
                const pedidoIds = pedidos.map(p => p.id);
                const itensComProdutos = await sql`
                    SELECT 
                        ip.*,
                        p.nome as produto_nome,
                        p.imagemUrl as produto_imagem
                    FROM items ip
                    JOIN produtos p ON ip.produto_id = p.id
                    WHERE ip.pedido_id = ANY(${pedidoIds})
                `;
    
                // Agrupa itens por pedido
                const itensPorPedido = itensComProdutos.reduce((acc, item) => {
                    if (!acc[item.pedido_id]) {
                        acc[item.pedido_id] = [];
                    }
                    acc[item.pedido_id].push(item);
                    return acc;
                }, {});
    
                // Atribui os itens aos pedidos
                pedidos.forEach(pedido => {
                    pedido.itens = itensPorPedido[pedido.id] || [];
                });
            }
    
            return pedidos || [];
        } catch (error) {
            console.error('Erro detalhado ao listar pedidos:', {
                usuarioId,
                status,
                error: error.message
            });
            throw new Error('Falha ao buscar pedidos. Verifique os parâmetros e tente novamente.');
        }
    }

    async buscarPorId(id) {
        try {
            const pedido = await sql`
                SELECT * FROM pedidos WHERE id = ${id}
            `.then(res => res[0]);

            
            if (!pedido) return null;

            
            pedido.itens = await sql`
                SELECT 
                    ip.*,
                    p.nome as produto_nome,
                    p.imagemUrl as produto_imagem
                FROM items ip
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
            const result = await sql`
                UPDATE pedidos 
                SET status = ${novoStatus} 
                WHERE id = ${id}
                RETURNING *
            `;
            return result.length > 0;
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
            // Primeiro deleta os itens
            await sql`
                DELETE FROM items WHERE pedido_id = ${id}
            `;
            
            // Depois deleta o pedido
            await sql`
                DELETE FROM pedidos WHERE id = ${id}
            `;
            
            return true;
        } catch (error) {
            console.error('Erro ao deletar pedido:', error);
            throw new Error('Falha ao deletar pedido.');
        }
    }
}