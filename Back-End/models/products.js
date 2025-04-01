import { sql } from '../config/db.js'; // Importe a configuração do banco de dados

sql`
    CREATE TABLE produtos (
        id TEXT NOT NULL PRIMARY KEY,
        nome TEXT NOT NULL,
        imagemUrl VARCHAR(255),
        preco NUMERIC(10, 2) NOT NULL,
        categoria TEXT NOT NULL,
        estoque INTEGER NOT NULL DEFAULT 0
    );
`.then(() => {
    console.log('Tabela de produtos criada com sucesso!');
}).catch((error) => {
    console.error('Erro ao criar tabela de acessórios:', error);
});

