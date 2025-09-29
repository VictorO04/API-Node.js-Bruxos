import dados from "../models/data.js";
const {bruxos} = dados;

const getAllBruxos = (req, res) => {
    res.status(200).json({
        total: bruxos.length,
        bruxos: bruxos
    });
}

const getBruxoById = (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    const bruxo = bruxos.find(b => b.id === id);

    if (!bruxo) {
        res.status(400);
    }

    res.status(200).json({
        total: bruxo.length,
        bruxo: bruxo
    });
}

const createBruxo = (req, res) => {
    const {nome, casa, anoNascimento, especialidade, nivelMagia, ativo} = req.body;

    if (!nome || !casa) {
        return res.status(400).json({
            sucess: false,
            message: "Nome e casa são obrigatórios"
        });
    }

    const novoBruxo = {
        id: bruxos.length + 1,
        nome,
        casa,
        anoNascimento: parseInt(anoNascimento),
        especialidade,
        nivelMagia,
        ativo       
    }

    bruxos.push(novoBruxo);

    res.status(201).json({
        sucess: true,
        message: "Bruxo cadastrado com sucesso",
        bruxo: novoBruxo
    });
}

const deleteBruxo = (req, res) => {
    let id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            sucess: false,
            message: "O ID deve ser válido"
        });
    }

    const bruxoParaRemover = bruxos.find(b => b.id === id);

    if(!bruxoParaRemover) {
        return res.status(404).json({
            sucess: false,
            message: `Bruxo com o id ${id} não existe`
        });
    }

    const bruxosFiltrados = bruxos.filter(bruxo => bruxo.id !== id);

    bruxos.splice(0, bruxos.length, ...bruxosFiltrados);

    res.status(200).json({
        sucess: true,
        message: `O bruxo com id ${id} foi removido com sucesso`
    });
}

export {getAllBruxos, getBruxoById, createBruxo, deleteBruxo};