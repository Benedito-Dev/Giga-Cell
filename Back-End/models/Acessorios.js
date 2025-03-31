import { sql } from '../config/db.js'; // Importe a configuração do banco de dados

sql`
    CREATE TABLE acessorios (
        id TEXT NOT NULL PRIMARY KEY,
        nome TEXT NOT NULL,
        tipo TEXT NOT NULL, -- Ex: capa, fone, carregador, película
        marca TEXT,
        compatibilidade TEXT[], -- Array de modelos compatíveis
        imagemUrl VARCHAR(255),
        material TEXT,
        cores_disponiveis TEXT[],
        preco NUMERIC(10, 2) NOT NULL,
        estoque INTEGER NOT NULL DEFAULT 0,
        data_cadastro TIMESTAMP NOT NULL DEFAULT NOW(),
        garantia_meses INTEGER
    );
`.then(() => {
    console.log('Tabela de acessórios criada com sucesso!');
}).catch((error) => {
    console.error('Erro ao criar tabela de acessórios:', error);
});