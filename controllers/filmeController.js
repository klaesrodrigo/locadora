'use strict'

import filmeRepo from '../repositories/filmeRepository';

class FilmeController{

    constructor(){}

    //Tratamento de exceção dos metodos do repository
    //Trata as respostas e envia os status corretos
    async findDisponivel (req, res) {
        try {
            const filmes = await new filmeRepo().findDisponivel()
            return res.status(200).send(filmes)
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                error: 'Erro ao listar filmes disponiveis'
            });
        }
    }

    //Tratamento de exceção dos metodos do repository
    //Trata as respostas e envia os status corretos
    async findLikeTitulo (req, res) {
        try {
            const filmes = await new filmeRepo().findLikeTitulo(req.body)

            //testa se filmes esta vazio
            if(filmes.length == 0){
                return res.status(204).send({message: 'Filme não encontrado'})                
            } else {
                return res.status(200).send(filmes)
            }

        } catch (err) {
            console.log(err);
            return res.status(500).send({
                error: 'Erro ao pesquisar titulo'
            });
        }
    }

    //Tratamento de exceção dos metodos do repository
    //Trata as respostas e envia os status corretos
    async locaFilme(req, res){
        try {
            const filme = await new filmeRepo().locaFilme(req.body)

            //verifica resposta
            if(filme){
                return res.status(200).send(filme)
            } else {
                return res.status(404).send({message: "Filme indisponivel"})
            }
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                error: 'Erro ao locar filme'
            });
        }
    }

    //Tratamento de exceção dos metodos do repository
    //Trata as respostas e envia os status corretos
    async devolveFilme(req, res){
        try {
            const filme = await new filmeRepo().devolveFilme(req.body)
            return res.status(200).send(filme)
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                error: 'Erro ao devolver filme'
            });
        }
    }

}

export default FilmeController