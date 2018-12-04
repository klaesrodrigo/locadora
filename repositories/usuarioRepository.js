'use strict'
import Usuario from '../models/Usuario'
import Cripto from '../utils/criptografia'

class UsuarioRepository{
    constructor(){}

    async createUsuario(data){
        data.senha = await new Cripto().crypt(data.senha)
        const usuario = await new Usuario(data).save()
        // usuario.senha = await new Cripto().decrypt(usuario.senha)
        await delete data.senha
        return [data,{message: "OK"}];
    }
}

export default UsuarioRepository