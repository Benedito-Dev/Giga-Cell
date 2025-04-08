import { sql } from '../config/db.js';

sql`
    CREATE TABLE itens (
        id TEXT NOT NULL PRIMARY KEY,
        pedido_id TEXT NOT NULL REFERENCES pedidos(id),
        produto_id TEXT NOT NULL REFERENCES produtos(id),
        quantidade INTEGER NOT NULL DEFAULT 1,
        preco_unitario NUMERIC(10, 2) NOT NULL,
        subtotal NUMERIC(10, 2) GENERATED ALWAYS AS (quantidade * preco_unitario) STORED
    );
`.then(() => {
    console.log('Tabela de itens criada com sucesso!');
}).catch((error) => {
    console.error('Erro ao criar tabela de itens:', error);
});