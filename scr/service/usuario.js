const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function getAllUsuario() {
    const connection = await mysql.createConnection(databaseConfig);

    const [rows] = await connection.query("SELECT * FROM usuario");

    await connection.end();

    return rows;
}

async function createUsuario(nome, dataNasc, telefone, cpf) {
    console.log(nome, dataNasc, telefone, cpf)
    let connection;
    try {
        connection = await mysql.createConnection(databaseConfig);

        const insertUsuario = "INSERT INTO usuario(nome, dataNasc, telefone, cpf) VALUES(?, ?, ?, ?)";

        await connection.query(insertUsuario, [nome, dataNasc, telefone, cpf]);
    } catch (error) {
        console.error("Erro ao inserir usuario:", error);
        throw error;
    } finally {
        if (connection) await connection.end();
    }
}

async function updateUsuario(id, nome, dataNasc, telefone, cpf) {
    const connection = await mysql.createConnection(databaseConfig);

    const updateUsuario = "UPDATE usuario SET nome = ?, dataNasc = ?, telefone = ?, cpf = ? WHERE id = ?";

    await connection.query(updateUsuario, [nome, dataNasc, telefone, cpf, id]);

    await connection.end();
}

async function deleteUsuario(id) {
    const connection = await mysql.createConnection(databaseConfig);

    await connection.query("DELETE FROM usuario WHERE id = ?", [id]);

    await connection.end();
}

async function getUsuarioById(id) {
    const connection = await mysql.createConnection(databaseConfig);

    const [usuario] = await connection.query("SELECT * FROM usuario WHERE id = ?", [id]);

    await connection.end();

    return usuario;
}

module.exports = {
    getAllUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarioById,
};