"use strict";

import Filme from "../models/Filme";

class FilmeRepository {
  constructor() {}

  //Busca no banco os filmes disponiveis
  async findDisponivel() {
    const filmes = await Filme.where({ flgDisponivel: 1 }).fetchAll();
    return filmes //retorna objeto de filmes
  }

  //Busca no banco a pesquisa por titulo
  async findLikeTitulo(data) {
    const filmes = await Filme.query(qb => {
      qb.where({ flgDisponivel: 1 }).andWhere("titulo","LIKE",`%${data.titulo}%`)
    })
    .fetchAll();

    return filmes //retorn objeto de filmes
    
  }

  //Responsavel por executar a logica de locação e armazenamento no banco
  async locaFilme(data){
    let filme = await Filme.where({id: data.id_filme}).fetch() //busca o filme no banco
    let dados = JSON.parse(JSON.stringify(filme))

    //Verifica se o filme esta disponivel
    if(dados.flgDisponivel){
      
      dados.flgDisponivel = 0 //Atualiza o filme para indisponivel
      filme = await filme.save(dados) //Armazena a atualização
  

      const func = filme.usuario() //Busca a tabela de relacionamento
      await func.attach({filme_id: data.id_filme, usuario_id: data.id_usuario}) //armazena na tabela de relacionamento com filme não devolvido

      return filme //retorna o filme locado
    } 
    else {
      return false //Retona false caso o filme esteja locado
    }
  }

  //Responsavel por executar a logica de devolução e armazenamento no banco
  async devolveFilme(data){
    let filme = await Filme.where({id: data.id_filme}).fetch() //busca o filme no banco
    let dados = JSON.parse(JSON.stringify(filme))

      dados.flgDisponivel = 1 //Atualiza filme para disponivel
      filme = await filme.save(dados) //Salva filme atualizado no banco

      const func =  filme.usuario() //Busca a tabela de relacionamento

      //Atualiza o relacionamento para filme devolvido
      func.updatePivot({flgDevolvido: 1}, { query: { where:{filme_id: data.id_filme, usuario_id: data.id_usuario, flgDevolvido: 0}}})  

      return filme //retorna filme devolvido
  }
}

export default FilmeRepository