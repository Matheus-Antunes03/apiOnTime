const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database.js");

async function createProdutoTable() {
    try{
        const connection = await mysql.createConnection(databaseConfig);

        await connection.query(`USE ${databaseConfig.database}`)

        await connection.query(`CREATE TABLE IF NOT EXISTS produto (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(50) NOT NULL,
            marca VARCHAR(50) NOT NULL,
            preco DOUBLE NOT NULL,
            dataValidade VARCHAR(10) NOT NULL,
            peso VARCHAR(10) NOT NULL
        )`);

        await connection.end();

        console.log("Table produto created!");
    }catch(error) {
        console.log(`Error creating table produto: ${error}`);
    }
}

createProdutoTable();