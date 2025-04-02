import { randomUUID } from 'node:crypto';
import { sql } from '../config/db.js'; // Importe a configuração do banco de dados

export class DatabasePostgresProdutos {
    // Método para listar produtos
    async list(search, category) {
        let produtos;

        if (search) {
            // Busca produtos onde o nome ou categoria contém o termo de pesquisa
            produtos = await sql`
                SELECT * FROM produtos 
                WHERE nome ILIKE ${'%' + search + '%'} 
                   OR categoria ILIKE ${'%' + search + '%'}
            `;
        } else {
            // Busca todos os produtos
            produtos = await sql`SELECT * FROM produtos`;
        }

        return produtos;
    }

    // Método para criar um novo produto
    async create(produto) {
        const { 
            nome, 
            imagemUrl, 
            preco, 
            categoria,
            descricao, 
            estoque 
        } = produto;
        
        const id = randomUUID(); // Gera um UUID único

        // Insere o produto no banco de dados
        try {
            await sql`
                INSERT INTO produtos (
                    id, nome, imagemurl, preco, categoria, descricao, estoque
                ) 
                VALUES (
                    ${id}, ${nome}, ${imagemUrl}, ${preco}, ${categoria}, ${descricao}, ${estoque}
                )
            `;
            
            console.log('Produto inserido com sucesso!');
            return { id, ...produto };
        } catch (error) {
            console.error('Erro na inserção:', error);
            return false;
        }
    }

    // Método para atualizar um produto existente
    async update(id, produto) {
        const { 
            nome, 
            imagemUrl, 
            preco, 
            categoria,
            descricao,
            estoque 
        } = produto;

        // Atualiza o produto no banco de dados
        await sql`
            UPDATE produtos 
            SET 
                nome = ${nome},
                imagemurl = ${imagemUrl},
                preco = ${preco},
                categoria = ${categoria},
                descricao = ${descricao},
                estoque = ${estoque}
            WHERE id = ${id}
        `;
        
        return true;
    }

    // Método para deletar um produto
    async delete(id) {
        // Remove o produto do banco de dados
        await sql`DELETE FROM produtos WHERE id = ${id}`;
        return true;
    }
}