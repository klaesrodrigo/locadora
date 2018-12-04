'use strict'

import filmeRepo from '../repositories/filmeRepository';

class FilmeController{

    constructor(){}

    async findDisponivel (req, res) {
        try {
            const filme = await new filmeRepo().findDisponivel()
            return res.status(201).send(filme);
        } catch (err) {
            console.log(err);
            return res.status(400).send({
                error: 'Erro ao listar filmes disponiveis'
            });
        }
    }

    async findLikeTitulo (req, res) {
        try {
            const filme = await new filmeRepo().findLikeTitulo(req.body)
            return res.status(201).send(filme);
        } catch (err) {
            console.log(err);
            return res.status(400).send({
                error: 'Erro ao listar competidor'
            });
        }
    }

    async locaFilme(req, res){
        try {
            const filme = await new filmeRepo().locaFilme(req.body)
            return res.status(201).send(filme);
        } catch (err) {
            console.log(err);
            return res.status(400).send({
                error: 'Erro ao locar filme'
            });
        }
    }

    async devolveFilme(req, res){
        try {
            const filme = await new filmeRepo().devolveFilme(req.body)
            return res.status(201).send(filme);
        } catch (err) {
            console.log(err);
            return res.status(400).send({
                error: 'Erro ao locar filme'
            });
        }
    }

}

export default FilmeController