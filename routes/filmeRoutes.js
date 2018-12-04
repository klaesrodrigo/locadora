'use strick'

import {Router} from "express"

const routes = Router()

import Filme from '../controllers/filmeController'

let filme = new Filme();

routes.get('/', filme.findDisponivel)
      .post('/', filme.findLikeTitulo)
      .post('/locar/', filme.locaFilme)
      .post('/devolver/', filme.devolveFilme)

module.exports = app => app.use('/filme', routes);