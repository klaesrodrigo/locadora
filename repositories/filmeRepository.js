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
      qb.where({ flgDisponivel: 1 }).andWhere("titulo","LIKE",`%${data.titulo}%`)
    })
    .fetchAll();
    return filmes;
  }

  async locaFilme(data){
    let filme = await Filme.where({id: data.id_filme}).fetch()
    let dados = JSON.parse(JSON.stringify(filme))

    if(dados.flgDisponivel){
      
      dados.flgDisponivel = 0
      filme = await filme.save(dados)
  
      const func = filme.usuario()
      await func.attach({filme_id: data.id_filme, usuario_id: data.id_usuario})
      return filme
    } 
    else {
      return {message: "Filme indisponivel"}
    }
  }

  async devolveFilme(data){
    let filme = await Filme.where({id: data.id_filme}).fetch()
    let dados = JSON.parse(JSON.stringify(filme))

      dados.flgDisponivel = 1
      filme = await filme.save(dados)

      const func =  filme.usuario()
      func.updatePivot({flgDevolvido: 1}, { query: { where:{filme_id: data.id_filme, usuario_id: data.id_usuario, flgDevolvido: 0}}})

      return filme
  }
}

export default FilmeRepository