const e = require("express");
const usuarioService = require("../service/usuario.js");
const { usuario } = require("../config/database.js");

async function getAllUsuario(req, res) {
    try {
        const rows = await usuarioService.getAllUsuario();

        res.status(200).json(rows);
    }catch(error) {
        res.status(500).send({
            message: "Error getting usuarios",
            body: error.message,
        });
    }
}

async function createUsuario(req, res){
    const { nome, dataNasc, telefone, cpf } = req.body;
    console.log(req.body)

    try{
        await usuarioService.createUsuario(nome, dataNasc, telefone, cpf);

        res.status(201).json({
            message: "Success!"
        });
    }catch(error) {
        res.status(500).send({
            message: "Error adding usuario!",
            error: error.message,
        });
    }
}

async function updateUsuario(req, res) {
    try{
        const { id } = req.params;
        const { nome, dataNasc, telefone, cpf } = req.body;

        await usuarioService.updateUsuario(id, nome, dataNasc, telefone, cpf);

        res.status(200).send("Success");
    }catch(error) {
        res.status(500).send({
            message: ("Error updating usuario!"),
            body: error.message,
        })
    }
}

async function deleteUsuario(req, res) {

    try {
    const { id } = req.params;

    await usuarioService.deleteUsuario(id);

    res.status(200).send({message: "Deleted usuario!"});
    } catch (error) {
        res.status(500).send({
            message: "Error deleting usuario!",
            error: error.message,
        })
    }
}

async function getUsuarioById(req, res) {
    try {
        const { id } = req.params;

        const usuario = await usuarioService.getUsuarioById(id);

        res.status(200).json(usuario);
    }catch(error) {
        res.status(500).send({
            message: "Error getting usuario by ID.",
            error: error.message,
        });
    }
}

module.exports = {
    getAllUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarioById,
};