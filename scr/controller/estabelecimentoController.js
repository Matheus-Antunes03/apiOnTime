const estabelecimentoService = require("../service/estabelecimento.js");

async function getAllEstabelecimento(req, res) {
    try {
        const rows = await estabelecimentoService.getAllEstabelecimento();

        res.status(200).json(rows);
    }catch(error) {
        res.status(500).send({
            message: "Error getting estabelecimentos",
            body: error.message,
        });
    }
}

async function createEstabelecimento(req, res){
const { nome, endereco, inscricaoMunicipal, cnpj } = req.body;
console.log(req.body);

try{
    await estabelecimentoService.createEstabelecimento(nome, endereco, inscricaoMunicipal, cnpj);

    res.status(201).json({
        message: "Success!"
    });
}catch(error) {
    res.status(500).send({
        message: "Error adding estabelecimento!",
        error: error.message,
    });
}
}

async function updateEstabelecimento(req, res) {
try{
    const { id } = req.params;
    const { nome, endereco, inscricaoMunicipal, cnpj } = req.body;

    await estabelecimentoService.updateEstabelecimento(id, nome, endereco, inscricaoMunicipal, cnpj);

    res.status(200).send("Success");
}catch(error) {
    res.status(500).send({
        message: ("Error updating estabelecimento!"),
        body: error.message,
    });
}
}

async function deleteEstabelecimento(req, res) {

try {
const { id } = req.params;

await estabelecimentoService.deleteEstabelecimento(id);

res.status(200).send({message: "Deleted estabelecimento!"});
} catch (error) {
    res.status(500).send({
        message: "Error deleting estabelecimento!",
        error: error.message,
    })
}
}

async function getEstabelecimentoById(req, res) {
try {
    const { id } = req.params;

    const user = await estabelecimentoService.getEstabelecimentoById(id);

    res.status(200).json(user);
}catch(error) {
    res.status(500).send({
        message: "Error getting estabelecimento by ID.",
        error: error.message,
    });
}
}

module.exports = {
    getAllEstabelecimento,
    createEstabelecimento,
    updateEstabelecimento,
    deleteEstabelecimento,
    getEstabelecimentoById,
}