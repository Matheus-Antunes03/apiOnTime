const e = require("express");
const produtoService = require("../service/produto.js");
const { produto } = require("../config/database.js");

async function getAllProduto(req, res) {
    try {
        const rows = await produtoService.getAllProduto();

        res.status(200).json(rows);
    }catch(error) {
        res.status(500).send({
            message: "Error getting produtos",
            body: error.message,
        });
    }
}

async function createProduto(req, res){
    const { nome, marca, precoOriginal, dataValidade, peso } = req.body;

    try{
        await produtoService.createProduto(nome, marca, precoOriginal, dataValidade, peso);

        res.status(201).json({
            message: "Success!"
        });
    }catch(error) {
        res.status(500).send({
            message: "Error adding produto!",
            error: error.message,
        });
    }
}

async function updateProduto(req, res) {
    try{
        const { id } = req.params;
        const { nome, marca, preco, dataValidade, peso } = req.body;

        await produtoService.updateProduto(id, nome, marca, preco, dataValidade, peso);

        res.status(200).send("Success");
    }catch(error) {
        res.status(500).send({
            message: ("Error updating produto!"),
            body: error.message,
        })
    }
}

async function deleteProduto(req, res) {

    try {
    const { id } = req.params;

    await produtoService.deleteProduto(id);

    res.status(200).send({message: "Deleted produto!"});
    } catch (error) {
        res.status(500).send({
            message: "Error deleting produto!",
            error: error.message,
        })
    }
}

async function getProdutoById(req, res) {
    try {
        const { id } = req.params;

        const produto = await produtoService.getProdutoById(id);

        res.status(200).json(produto);
    }catch(error) {
        res.status(500).send({
            message: "Error getting produto by ID.",
            error: error.message,
        });
    }
}

module.exports = {
    getAllProduto,
    createProduto,
    updateProduto,
    deleteProduto,
    getProdutoById,
};