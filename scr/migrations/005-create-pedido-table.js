const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createPedidoTable() {
    try{
        const connection = await mysql.createConnection(databaseConfig);

        await connection.query(`USE ${databaseConfig.database}`)

        await connection.query(`CREATE TABLE IF NOT EXISTS pedido (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            idUsuario INT NOT NULL,
            idProduto INT NOT NULL,
            idEstabelecimento INT NOT NULL,
            quantidade INT NOT NULL,
            FOREIGN KEY (idUsuario) REFERENCES usuario(id),
            FOREIGN KEY (idProduto) REFERENCES produto(id),
            FOREIGN KEY (idEstabelecimento) REFERENCES estabelecimento(id)
        )`);

        await connection.end();

        console.log("Table pedido created!");
    }catch(error) {
        console.log(`Error creating table pedido: ${error}`);
    }
}

createPedidoTable();