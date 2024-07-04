const e = require("express");
const pedidoService = require("../service/pedido.js");
const { pedido } = require("../config/database.js");

async function getAllPedido(req, res) {
    try {
        const rows = await pedidoService.getAllPedido();

        res.status(200).json(rows);
    }catch(error) {
        res.status(500).send({
            message: "Error getting pedidos",
            body: error.message,
        });
    }
}

async function createPedido(req, res){
    const { idUsuario, idProduto, idEstabelecimento, quantidade } = req.body;
    console.log(req.body)

    try{
        await pedidoService.createPedido(idUsuario, idProduto, idEstabelecimento, quantidade);

        res.status(201).json({
            message: "Success!"
        });
    }catch(error) {
        res.status(500).send({
            message: "Error adding pedido!",
            error: error.message,
        });
    }
}

async function updatePedido(req, res) {
    try{
        const { id } = req.params;
        const { idUsuario, idProduto, idEstabelecimento, quantidade, valorTotal } = req.body;

        await pedidoService.updatePedido(id, idUsuario, idProduto, idEstabelecimento, quantidade, valorTotal);

        res.status(200).send("Success");
    }catch(error) {
        res.status(500).send({
            message: ("Error updating pedido!"),
            body: error.message,
        })
    }
}

async function deletePedido(req, res) {

    try {
    const { id } = req.params;

    await pedidoService.deletePedido(id);

    res.status(200).send({message: "Deleted pedido!"});
    } catch (error) {
        res.status(500).send({
            message: "Error deleting pedido!",
            error: error.message,
        })
    }
}

async function getPedidoById(req, res) {
    try {
        const { id } = req.params;

        const pedido = await pedidoService.getPedidoById(id);

        res.status(200).json(pedido);
    }catch(error) {
        res.status(500).send({
            message: "Error getting pedido by ID.",
            error: error.message,
        });
    }
}

module.exports = {
    getAllPedido,
    createPedido,
    updatePedido,
    deletePedido,
    getPedidoById,
};