// src/repositories/auth.repository.js
import { sql } from '../database.js' // ou qualquer cliente Postgres que você usa

export class AuthRepository {
  async findUserByEmail(email) {
    const user = await sql`SELECT * FROM usuarios WHERE email = ${email}`
    return user[0] || null
  }

  async findUserById(id) {
    const user = await sql`SELECT id_usuario, nome, email, data_cadastro FROM usuarios WHERE id_usuario = ${id}`
    return user[0] || null
  }
}
