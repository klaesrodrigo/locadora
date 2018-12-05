'use strick'

import {Router} from "express"
import FilmeController from '../controllers/filmeController'
import { authorize } from "../services/authService";

const routes = Router()
let filme = new FilmeController();

//Armazena as rotas no routes
routes.get('/filmes', filme.findDisponivel) //retorna uma array de objtos, com a lista todos os filmes disponiveis
      .post('/filmes', filme.findLikeTitulo) //retorna uma array de objetos, com pesquisa os filmes pelo titulo
      .post('/locar/', authorize, filme.locaFilme) //loca o filme e retorna o objeto com os dados do filme locado
      .post('/devolver/', authorize, filme.devolveFilme)//devolve o filme e retorna o objeto com os dados do filme devolvido


//importa a rota base + routes, para ser carregada no routes.js
module.exports = app => app.use('/', routes);