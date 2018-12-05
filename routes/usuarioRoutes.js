'use strick'

import { Router } from "express"
import Usuario from '../controllers/usuarioController'
import { authorize } from "../services/authService";

const routes = Router()
const usuario = new Usuario();

//Armazena as rotas no routes
routes.post('/usuario', usuario.createUsuario) //cria usuário e retorn um objeto com nome e email cadastrado
      .post('/logon', usuario.logon) //Faz o logon do usuário e retorna o token para autorização das rotas
      .post('/logoff', authorize, usuario.logoff) //faz logoff no usuário

//importa a rota base + routes, para ser carregada no routes.js
module.exports = app => app.use('/', routes);