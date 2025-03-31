import { randomUUID } from 'node:crypto';
import { sql } from '../config/db.js'; // Importe a configuração do banco de dados

export class DatabasePostgresAcessorios {
    // Método para listar acessórios
    async list(search) {
        let acessorios;

        if (search) {
            // Busca acessórios onde o nome ou a marca contém o termo de pesquisa
            acessorios = await sql`
                SELECT * FROM acessorios 
                WHERE nome ILIKE ${'%' + search + '%'} 
                   OR marca ILIKE ${'%' + search + '%'}
                   OR tipo ILIKE ${'%' + search + '%'}
            `;
        } else {
            // Busca todos os acessórios
            acessorios = await sql`SELECT * FROM acessorios`;
        }

        return acessorios;
    }

    // Método para criar um novo acessório
    async create(acessorio) {
        const { 
            nome, 
            tipo, 
            marca, 
            compatibilidade, 
            imagemUrl, 
            material, 
            cores_disponiveis, 
            preco, 
            estoque, 
            garantia_meses 
        } = acessorio;
        
        const id = randomUUID(); // Gera um UUID único

        // Insere o acessório no banco de dados
        try {
            // Inicia uma transação
            await sql`BEGIN`;
            
            // 1. Insere na tabela acessorios
            await sql`
                INSERT INTO acessorios (
                    id, nome, tipo, marca, compatibilidade, imagemurl, 
                    material, cores_disponiveis, preco, estoque, garantia_meses
                ) 
                VALUES (
                    ${id}, ${nome}, ${tipo}, ${marca}, ${compatibilidade}, ${imagemUrl},
                    ${material}, ${cores_disponiveis}, ${preco}, ${estoque}, ${garantia_meses}
                )
            `;
            
            // 2. Insere na tabela produtos
            await sql`
                INSERT INTO produtos (
                    id, nome, imagemUrl, preco, estoque
                )
                VALUES (
                    ${id}, ${nome}, ${imagemUrl}, ${preco}, ${estoque}
                )
            `;
            
            // Confirma a transação
            await sql`COMMIT`;
            
            console.log('Acessório e produto inseridos com sucesso!');
            return true;
        } catch (error) {
            // Em caso de erro, faz rollback
            await sql`ROLLBACK`;
            console.error('Erro na inserção:', error);
            return false;
        }
    }

    // Método para atualizar um acessório existente
    async update(id, acessorio) {
        const { 
            nome, 
            tipo, 
            marca, 
            compatibilidade, 
            imagemUrl, 
            material, 
            cores_disponiveis, 
            preco, 
            estoque, 
            garantia_meses 
        } = acessorio;

        // Atualiza o acessório no banco de dados
        await sql`
            UPDATE acessorios 
            SET 
                nome = ${nome},
                tipo = ${tipo},
                marca = ${marca},
                compatibilidade = ${compatibilidade},
                imagemurl = ${imagemUrl},
                material = ${material},
                cores_disponiveis = ${cores_disponiveis},
                preco = ${preco},
                estoque = ${estoque},
                garantia_meses = ${garantia_meses}
            WHERE id = ${id}
        `;
    }

    // Método para deletar um acessório
    async delete(id) {
        // Remove o acessório do banco de dados
        await sql`DELETE FROM acessorios WHERE id = ${id}`;
    }
}