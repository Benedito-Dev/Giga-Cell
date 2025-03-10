import 'dotenv/config'; // Carrega as variáveis de ambiente
import http from 'http'; // Importa o módulo http
import postgres from 'postgres'; // Importa o módulo postgres
import { neon } from '@neondatabase/serverless'; // Importa a função neon do módulo @neondatabase/serverless

// Conecta ao banco de dados usando a URL do .env
export const sql = neon(process.env.DATABASE_URL);