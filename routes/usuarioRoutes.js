'use strick'

import {Router} from "express"

const routes = Router()

import Usuario from '../controllers/usuarioController'

let usuario = new Usuario();

routes.post('/', usuario.createUsuario)

module.exports = app => app.use('/usuario', routes);