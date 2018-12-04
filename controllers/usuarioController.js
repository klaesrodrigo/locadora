'use strict'

import UsuarioRepo from '../repositories/usuarioRepository'

class UsuarioController {
    constructor() {}

    async createUsuario(req, res) {
        try {
            const usuario = await new UsuarioRepo().createUsuario(req.body)
            return res.status(201).send(usuario)
        } catch (err) {
            console.log(err);
            return res.status(400).send({
                error: 'Erro ao criar usuario'
            });
        }
    }

}

export default UsuarioController