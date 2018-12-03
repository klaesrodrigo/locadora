'use strict'

import filmeRepo from '../repositories/filmeRepository';

class FilmeController{

    constructor(){}

    async findDisponivel (req, res) {
        try {
            const filme = await new filmeRepo().findDisponivel()
            res.status(201).send(filme);
        } catch (err) {
            console.log(err);
            return res.status(400).send({
                error: 'Erro ao listar filmes disponiveis'
            });
        }
    }

    async findLikeTitulo (req, res) {
        try {
            const filme = await new filmeRepo().findLikeTitulo(req.body.titulo)
            res.status(201).send(filme);
        } catch (err) {
            console.log(err);
            return res.status(400).send({
                error: 'Erro ao listar competidor'
            });
        }
    }

}

export default FilmeController


    
    // getCompetidorBy: (req, res) => {
    //     try {
    //         Competidor
    //             .where(req.params)
    //             .fetchAll({
    //                 withRelated: "campeonato"
    //             })
    //             .then(competidor => res.json({
    //                 competidor
    //             }))
    //             .catch(err => {
    //                 console.log(err);
    //                 res.status(400).send({
    //                     err
    //                 });
    //             });
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(400).send({
    //             error: 'Erro ao listar competidor'
    //         });
    //     }
    // },
    // postCompetidor: (req, res) => {
    //     try {
    //         new Competidor(req.body)
    //             .save()
    //             .then(saved => res.json({
    //                 saved
    //             }))
    //             .catch(err => {
    //                 console.log(err);
    //                 res.status(400).send({
    //                     err
    //                 });
    //             });
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(400).send({
    //             error: 'Erro ao inserir competidor'
    //         });
    //     }
    // },
    // putCompetidor: (req, res) => {
    //     try {
    //         Competidor
    //             .where(req.params)
    //             .fetch()
    //             .then(Competidor => {
    //                 Competidor
    //                     .save(req.body)
    //                     .then(saved => res.json({
    //                         saved
    //                     }));
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 res.status(400).send({
    //                     err
    //                 });
    //             });
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(400).send({
    //             error: 'Erro ao alterar competidor'
    //         });
    //     }
    // },
    // deleteCompetidor: (req, res) => {
    //     try {
    //         Competidor
    //             .where(req.params)
    //             .destroy()
    //             .then(destroyed => res.json({
    //                 destroyed
    //             }))
    //             .catch(err => {
    //                 console.log(err);
    //                 res.status(400).send({
    //                     err
    //                 });
    //             });
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(400).send({
    //             error: 'Erro ao deletar competidor'
    //         });
    //     }
    // },
    // getCompetidorCampeonato: (req, res) => {
    //     try {
    //         let competidores = [];
    //         Competidor
    //             .query(function (qb) {
    //                 qb.innerJoin('competidor_campeonato', 'competidor.id', 'competidor_campeonato.competidor_id');
    //                 qb.where('competidor_campeonato.campeonato_id', '=', req.params.campeonato_id);
    //             })
    //             .fetchAll()
    //             .then(data => {
    //                 if (data.length < 2) {
    //                     res.send("O número minímo de competidores para gerar partidas é de 2")
    //                 } else {
    //                     data.forEach(element => {
    //                         if (element.id != req.body.competidor_id){
    //                             competidores.push(element.id);
    //                             console.log("elemento: " + element.id + " - Body: " + req.body.competidor_id);
    //                         }
    //                     });
    //                     for (let i = 0; i < competidores.length; i++) {
    //                         const idComp = req.body.competidor_id;
    //                         let idAdv = competidores[i];
    //                         const body = {
    //                             status: "Aguardando",
    //                             campeonato_id: req.params.campeonato_id,
    //                             resultado: ""
    //                         }
    //                         let partidas = new Partidas(body);
    //                         partidas
    //                             .save()
    //                             .then(saved => {
    //                                 const func = partidas.competidor();
    //                                 Promise.all([
    //                                     func.attach(idComp),
    //                                     func.attach(idAdv)
    //                                     ]
    //                                   ).then(result => {
    //                                     console.log('----');
    //                                   });
    //                             })
    //                     }
    //                 }
    //                 res.send("ok");
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 res.status(400).send({
    //                     err
    //                 });
    //             });
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(400).send({
    //             error: 'Erro ao deletar competidor'
    //         });
    //     }
    // }

