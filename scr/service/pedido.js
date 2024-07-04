const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function getAllPedido() {
    const connection = await mysql.createConnection(databaseConfig);

    const [rows] = await connection.query("SELECT pedido.id, pedido.idUsuario, pedido.idProduto, pedido.idEstabelecimento, pedido.quantidade, (produto.preco * pedido.quantidade) AS valorTotal FROM pedido INNER JOIN produto ON pedido.idProduto = produto.id");

    await connection.end();

    return rows;
}

async function createPedido(idUsuario, idProduto, idEstabelecimento, quantidade) {
    console.log(idUsuario, idProduto, idEstabelecimento, quantidade);
    let connection;
    try {
        connection = await mysql.createConnection(databaseConfig);
        const insertPedido = "INSERT INTO pedido(idUsuario, idProduto, idEstabelecimento, quantidade) VALUES(?, ?, ?, ?)";
        await connection.query(insertPedido, [idUsuario, idProduto, idEstabelecimento, quantidade]);
    } catch (error) {
        console.error("Erro ao inserir pedido:", error);
        throw error;
    } finally {
        if (connection) await connection.end();
    }
}

async function updatePedido(id, idUsuario, idProduto, idEstabelecimento, quantidade) {
    const connection = await mysql.createConnection(databaseConfig);

    const updatePedido = "UPDATE pedido SET idUsuario = ?, idProduto = ?, idEstabelecimento = ?, quantidade = ? WHERE id = ?";

    await connection.query(updatePedido, [idUsuario, idProduto, idEstabelecimento, quantidade, id]);

    await connection.end();
}

async function deletePedido(id) {
    const connection = await mysql.createConnection(databaseConfig);

    await connection.query("DELETE FROM pedido WHERE id = ?", [id]);

    await connection.end();
}

async function getPedidoById(id) {
    const connection = await mysql.createConnection(databaseConfig);

    const [pedido] = await connection.query("SELECT pedido.id, pedido.idUsuario, pedido.idProduto, pedido.idEstabelecimento, pedido.quantidade, (produto.preco * pedido.quantidade) AS valorTotal FROM pedido INNER JOIN produto ON pedido.idProduto = produto.id WHERE pedido.id = ?", [id]);

    await connection.end();

    return pedido;
}

module.exports = {
    getAllPedido,
    createPedido,
    updatePedido,
    deletePedido,
    getPedidoById,
};