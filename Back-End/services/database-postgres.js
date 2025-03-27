import { randomUUID } from 'node:crypto';
import { sql } from '../config/db.js'; // Importe a configuração do banco de dados

export class DatabasePostgres {
    // Método para listar celulares
    async list(search) {
        let celulares;

        if (search) {
            // Busca celulares onde a marca ou o modelo contém o termo de pesquisa
            celulares = await sql`
                SELECT * FROM celulares 
                WHERE marca ILIKE ${'%' + search + '%'} 
                   OR modelo ILIKE ${'%' + search + '%'}
            `;
        } else {
            // Busca todos os celulares
            celulares = await sql`SELECT * FROM celulares`;
        }

        return celulares;
    }

    // Método para criar um novo celular
    async create(celular) {
        const { marca, modelo, armazenamento_gb, ram_gb, sistema_operacional, preco, lancamento, imagemUrl } = celular;
        const id = randomUUID(); // Gera um UUID único

        // Insere o celular no banco de dados
        await sql`
            INSERT INTO celulares (id, marca, modelo, imagemurl, armazenamento_gb, ram_gb, sistema_operacional, preco, lancamento) 
            VALUES (${id}, ${marca}, ${modelo}, ${imagemUrl}, ${armazenamento_gb}, ${ram_gb}, ${sistema_operacional}, ${preco}, ${lancamento})
        `;
    }

    // Método para atualizar um celular existente
    async update(id, celular) {
        const { marca, modelo, armazenamento_gb, ram_gb, sistema_operacional, preco, lancamento } = celular;

        // Atualiza o celular no banco de dados
        await sql`
            UPDATE celulares 
            SET marca = ${marca}, modelo = ${modelo}, armazenamento_gb = ${armazenamento_gb}, 
                ram_gb = ${ram_gb}, sistema_operacional = ${sistema_operacional}, preco = ${preco}, 
                lancamento = ${lancamento} 
            WHERE id = ${id}
        `;
    }

    // Método para deletar um celular
    async delete(id) {
        // Remove o celular do banco de dados
        await sql`DELETE FROM celulares WHERE id = ${id}`;
    }
}