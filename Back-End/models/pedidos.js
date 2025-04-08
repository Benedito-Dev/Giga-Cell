import { sql } from "../config/db.js";

sql`
    CREATE TABLE pedidos (
     id TEXT NOT NULL PRIMARY KEY,
        usuario_id TEXT NOT NULL REFERENCES usuarios(id_usuario),
        data TIMESTAMP NOT NULL DEFAULT NOW(),
        status VARCHAR(20) NOT NULL DEFAULT 'pendente',
        total NUMERIC(10, 2) NOT NULL,
        forma_pagamento VARCHAR(30) NOT NULL
    );
`.then(() => {
    console.log("Tabela criada com sucesso!")
}).catch((error) => {
    console.error('Erro ao criar tabela de pedidos:', error);
});