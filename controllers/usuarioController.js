'use strict'

import UsuarioRepo from '../repositories/usuarioRepository'

class UsuarioController {
    constructor() {}

    async createUsuario(req, res) {
        try {
            const usuario = await new UsuarioRepo().createUsuario(req.body)
            return res.status(200).send(usuario)
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                error: 'Erro ao criar usuario'
            });
        }
    }

    async logon(req, res){
        try {
            const usuario = await new UsuarioRepo().logon(req.body)
            
            if(usuario)
                return res.status(200).send(usuario)
            else
                return res.status(401).send({message: 'Usuário ou Senha inválidos'})
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                error: 'Erro ao logar usuario'
            });
        }
    }

    async logoff(req, res){
        try {
            let token = req.headers['token']
            const usuario = await new UsuarioRepo().logoff(req.body, token)
            
            if(usuario)
                return res.status(200).send({message: 'Usuário deslogado'})
            else
                return res.status(400).send({message: 'Não foi possível fazer logoff no usuário'})
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                error: 'Erro fazer logoff usuario'
            });
        }
    }

}

export default UsuarioController