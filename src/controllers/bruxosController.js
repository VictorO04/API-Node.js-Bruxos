import { request } from "express";
import dados from "../models/data.js";
const {bruxos} = dados;

const getAllBruxos = (req, res) => {
    res.status(200).json({
        status: 200,
        success: true,
        message: "Bruxos encontrados com sucesso",
        total: bruxos.length,
        data: bruxos
    });
}

const getBruxoById = (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    const bruxo = bruxos.find(b => b.id === id);

    if (!bruxo) {
        res.status(404).json({
            status: 404,
            error: "Not founded",
            success: false,
            message: `Bruxo com o id ${id} não encontrado`,
            data: null
        });;
    } else {
        res.status(200).json({
            status: 200,
            success: true,
            message: `Bruxo com o id ${id} encontrado`,
            total: bruxo.length,
            data: bruxo
    });
    }
}

const createBruxo = (req, res) => {
    const {nome, casa, anoNascimento, especialidade, nivelMagia, ativo} = req.body;
    const nomeExiste = bruxos.some(n => n.nome.toLowerCase() === nome.toLowerCase());

    const {admin} = req.body;

    if (!admin) {
        return res.status(403).json({
            status: 403,
            error: "Forbidden",
            success: false,
            message: "Você não possui permissão para criar um bruxo"
        });
    }

    if (!nome) {
        return res.status(400).json({
            status: 400,
            error: "Bad request",
            success: false,
            message: "Requisição mal executada! 'nome' é obrigatório",
            data: null
        });
    }
    
    if (nomeExiste) {
        return res.status(409).json({
            status: 409,
            error: "Conflict",
            success: false,
            message: `Bruxo com o nome ${nome} já existe`,
            data: null
        });
    }

    if (!casa) {
        return res.status(400).json({
            status: 400,
            error: "Bad request",
            sucess: false,
            message: "Requisição mal executada! 'casa' é obrigatória",
            data: null
        });
    }

    if (!anoNascimento) {
        return res.status(400).json({
            status: 400,
            error: "Bad request",
            success: false,
            message: "Requisição mal executada! 'anoNascimento' é obrigatório",
            data: null
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
        status: 201,
        success: true,
        message: "Bruxo cadastrado com sucesso",
        data: novoBruxo
    });
}

const updateBruxo = (req, res) => {
    const id = parseInt(req.params.id);
    const {nome, casa, anoNascimento, especialidade, nivelMagia, ativo} = req.body;

    const {admin} = req.body;

    if (!admin) {
        return res.status(403).json({
            status: 403,
            error: "Forbidden",
            success: false,
            message: "Você não possui permissão para atualizar um bruxo"
        });
    }

    if (isNaN(id)) {
        return res.status(400).json({
            status: 400,
            error: "Bad request",
            success: false,
            message: "O id deve ser válido",
            data: null
        });
    }

    const bruxoExiste = bruxos.find(b => b.id === id);

    if (!bruxoExiste) {
        return res.status(404).json({
            status: 404,
            error: "Not founded",
            success: false,
            message: "Este bruxo não existe",
            data: null
        });
    }

    const bruxoAtualizado = bruxos.map(bruxo => bruxo.id === id
        ? {
            ...bruxo,
            ...(nome && {nome}),
            ...(casa && {casa}),
            ...(anoNascimento && {anoNascimento}),
            ...(especialidade && {especialidade}),
            ...(nivelMagia && {nivelMagia}),
            ...(ativo && {ativo})
        }
        : bruxo
    );

    bruxos.splice(0, bruxos.length, ...bruxoAtualizado);

    const bruxoAtualizados = bruxos.find(p => p.id === id);

    res.status(200).json({
        status: 200,
        success: true,
        message: "Bruxo atualizado com sucesso",
        data: bruxoAtualizados
    });
}

const deleteBruxo = (req, res) => {
    const id = parseInt(req.params.id);
    const {admin} = req.body;

    if (!admin) {
        return res.status(403).json({
            status: 403,
            error: "Forbidden",
            success: false,
            message: "Você não possui permissão para deletar um bruxo"
        });
    }


    if (isNaN(id)) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: "O id deve ser válido"
        });
    }

    const bruxoParaRemover = bruxos.find(b => b.id === id);

    if(!bruxoParaRemover) {
        return res.status(404).json({
            status: 404,
            success: false,
            message: `Bruxo com o id ${id} não encontrado`
        });
    }
    const bruxosFiltrados = bruxos.filter(bruxo => bruxo.id !== id);

    bruxos.splice(0, bruxos.length, ...bruxosFiltrados);

    res.status(200).json({
        status: 200,
        success: true,
        message: `O bruxo com id ${id} foi removido com sucesso`
    });
}

export {getAllBruxos, getBruxoById, createBruxo, updateBruxo, deleteBruxo};