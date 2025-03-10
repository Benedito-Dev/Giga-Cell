import { sql } from './db.js';

sql`
    CREATE TABLE produtos (
        id TEXT PRIMARY KEY,
        Produto TEXT NOT NULL,
        Preco NUMERIC(10, 2) NOT NULL,
        Unidade INTEGER NOT NULL
    );
`.then(() => {
    console.log('Tabela criada com sucesso!');
})