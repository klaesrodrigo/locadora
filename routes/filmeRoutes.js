'use strick'

import {Router} from "express"

const routes = Router()

import Filme from '../controllers/filmeController'
import { authorize } from "../services/authService";

let filme = new Filme();

routes.get('/filme', filme.findDisponivel)
      .post('/filme', filme.findLikeTitulo)
      .post('/locar/', authorize, filme.locaFilme)
      .post('/devolver/', authorize, filme.devolveFilme)

module.exports = app => app.use('/', routes);