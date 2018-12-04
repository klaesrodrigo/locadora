"use strict";

import Filme from "../models/Filme";

class FilmeRepository {
  constructor() {}

  async findDisponivel() {
    const filmes = await Filme.where({ flgDisponivel: 1 }).fetchAll();
    return filmes;
  }

  async findLikeTitulo(data) {
    const filmes = await Filme.query(qb => {
      qb.where({ flgDisponivel: 1 }).andWhere("titulo","LIKE",`%${data.titulo}%`);
    })
    .fetchAll();
    return filmes;
  }

  async locaFilme(data){
    let filme = await Filme.where({id: data.id_filme}).fetch()
    const dados = JSON.parse(JSON.stringify(filme))
    if(dados.flgDisponivel){
      dados.flgDisponivel = 0
      filme = await filme.save(dados)
      
      const func = filme.usuario()
      await func.attach({filme_id: data.id_filme, usuario_id: data.id_usuario})

      return filme

    } else{

      return {message: "Filme indisponivel"}

    }
  }

  async devolveFilme(data){
    let filme = await Filme.where({id: data.id_filme}).fetch()
    const dados = JSON.parse(JSON.stringify(filme))

      dados.flgDisponivel = 1
      filme = await filme.save(dados)

      const func =  filme.usuario()
      func.updatePivot({flgDevolvido: 1}, { query: { where:{filme_id: data.id_filme, usuario_id: data.id_usuario, flgDevolvido: 0}}})

      return filme
  }
}

export default FilmeRepository;

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
