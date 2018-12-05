'use strict'
import Usuario from '../models/Usuario'
import Cripto from '../services/criptografiaService'
import {generateToken} from '../services/authService'

class UsuarioRepository{
    constructor(){}

    async createUsuario(data){
        data.senha = await new Cripto().crypt(data.senha)
        const usuario = await new Usuario(data).save()
        await delete data.senha
        return [data,{message: "OK"}]
    }

    async logon(data){
        let senha = await new Cripto().crypt(data.senha)
        const usuario = await Usuario.query(qb => {
            qb.where({ senha: senha }).andWhere({email: data.email})
        }).fetch()
        
        if(!usuario){
            return false;
        } else {
            let dados = JSON.parse(JSON.stringify(usuario))

            let dataToken = {email: dados.email, nome: dados.nome }
            const token = await generateToken(dataToken)

            await usuario.save({token: token})
            
            return {usuario: dataToken, token}
        }
    }

    async logoff(data, token){

        const usuario = await Usuario.query(qb => {
            qb.where({ token: token }).andWhere({email: data.email})
        }).fetch()
        
        if(!usuario){
            return false;
        } else {
            await usuario.save({token: ""})            
            return true
        }
    }
}

export default UsuarioRepository