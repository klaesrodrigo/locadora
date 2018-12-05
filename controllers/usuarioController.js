'use strict'

import UsuarioRepo from '../repositories/usuarioRepository'

class UsuarioController {
    constructor() {}

    //Tratamento de exceção dos metodos do repository
    //Trata as respostas e envia os status corretos
    async createUsuario(req, res) {
        try {
            const usuario = await new UsuarioRepo().createUsuario(req.body)
            return res.status(200).send(usuario)
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                error: 'Erro ao criar usuário'
            });
        }
    }

    //Tratamento de exceção dos metodos do repository
    //Trata as respostas e envia os status corretos
    async logon(req, res){
        try {
            const usuario = await new UsuarioRepo().logon(req.body)
            
            //Verifica se a resposta é um usuário
            if(usuario)
                return res.status(200).send(usuario)
            else
                return res.status(401).send({message: 'Usuário ou Senha inválidos'})
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                error: 'Erro ao logar usuário'
            });
        }
    }

    //Tratamento de exceção dos metodos do repository
    //Trata as respostas e envia os status corretos
    async logoff(req, res){
        try {
            let token = req.headers['token']
            const usuario = await new UsuarioRepo().logoff(token) 
            //Verifica se a resposta é um usuário
            if(usuario)
                return res.status(200).send({message: 'Usuário deslogado'})
            else
                return res.status(400).send({message: 'Não foi possível fazer logoff no usuário'})
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                error: 'Erro fazer logoff usuário'
            });
        }
    }

}

export default UsuarioController