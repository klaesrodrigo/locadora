'use strick'

import { Router } from "express"
import Usuario from '../controllers/usuarioController'
import { authorize } from "../services/authService";

const routes = Router()
const usuario = new Usuario();

routes.post('/usuario', usuario.createUsuario)
      .post('/logon', usuario.logon)
      .post('/logoff', authorize, usuario.logoff)

module.exports = app => app.use('/', routes);