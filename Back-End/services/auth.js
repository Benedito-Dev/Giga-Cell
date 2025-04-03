import bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { sql } from '../config/db.js';

export class DatabasePostgresAuth {
    // Método para registrar um novo usuário
    async register(usuarioData) {
        const { nome, email, senha, cpf, telefone, endereco } = usuarioData;

        // Verificar se email ou CPF já existem
        const [emailExists] = await sql`
            SELECT id_usuario FROM usuarios WHERE email = ${email}
        `;

        if (emailExists) {
            throw new Error('Email já cadastrado');
        }

        const [cpfExists] = await sql`
            SELECT id_usuario FROM usuarios WHERE cpf = ${cpf}
        `;

        if (cpfExists) {
            throw new Error('CPF já cadastrado');
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);
        
        // Gerar UUID como TEXT
        const id_usuario = randomUUID();

        // Inserir novo usuário
        const [newUser] = await sql`
            INSERT INTO usuarios (
                id_usuario, nome, email, senha, cpf, telefone, endereco
            ) VALUES (
                ${id_usuario}, ${nome}, ${email}, ${hashedPassword}, ${cpf}, ${telefone}, ${endereco}
            ) RETURNING id_usuario, nome, email, cpf, telefone, endereco, data_cadastro
        `;

        return newUser;
    }

    // Método para fazer login
    async login(email, senha) {
        // Buscar usuário pelo email
        const [user] = await sql`
            SELECT id_usuario, nome, email, senha FROM usuarios WHERE email = ${email}
        `;

        if (!user) {
            throw new Error('Credenciais inválidas');
        }

        // Verificar senha
        const passwordMatch = await bcrypt.compare(senha, user.senha);
        if (!passwordMatch) {
            throw new Error('Credenciais inválidas');
        }

        // Retornar dados básicos do usuário (sem a senha)
        return {
            id_usuario: user.id_usuario,
            nome: user.nome,
            email: user.email
        };
    }

    // Método para buscar usuário por ID
    async getUserById(id_usuario) {
        const [user] = await sql`
            SELECT id_usuario, nome, email, cpf, telefone, endereco, data_cadastro 
            FROM usuarios 
            WHERE id_usuario = ${id_usuario}
        `;

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return user;
    }

    // Método para buscar usuário por email
    async getUserByEmail(email) {
        const [user] = await sql`
            SELECT id_usuario, nome, email FROM usuarios WHERE email = ${email}
        `;

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return user;
    }

    // Método para atualizar dados do usuário
    async updateUser(id_usuario, updateData) {
        const { nome, telefone, endereco } = updateData;

        const [updatedUser] = await sql`
            UPDATE usuarios 
            SET 
                nome = ${nome},
                telefone = ${telefone},
                endereco = ${endereco}
            WHERE id_usuario = ${id_usuario}
            RETURNING id_usuario, nome, email, telefone, endereco
        `;

        return updatedUser;
    }

    // Método para atualizar senha
    async updatePassword(id_usuario, currentPassword, newPassword) {
        // Primeiro verificar a senha atual
        const [user] = await sql`
            SELECT senha FROM usuarios WHERE id_usuario = ${id_usuario}
        `;

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const passwordMatch = await bcrypt.compare(currentPassword, user.senha);
        if (!passwordMatch) {
            throw new Error('Senha atual incorreta');
        }

        // Hash da nova senha
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await sql`
            UPDATE usuarios 
            SET senha = ${hashedPassword}
            WHERE id_usuario = ${id_usuario}
        `;

        return true;
    }

    // Método para deletar usuário (opcional)
    async deleteUser(id_usuario) {
        await sql`
            DELETE FROM usuarios WHERE id_usuario = ${id_usuario}
        `;
        return true;
    }
}