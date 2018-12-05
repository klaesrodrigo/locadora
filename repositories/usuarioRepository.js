'use strict'
import Usuario from '../models/Usuario'
import Cripto from '../services/criptografiaService'
import {generateToken} from '../services/authService'

class UsuarioRepository{
    constructor(){}

    //Cria usuário no banco
    //Argumento é um objeto com as informações para cadastrar usuário (nome, email, senha)
    async createUsuario(data){
        data.senha = await new Cripto().crypt(data.senha) //Encripta senha
        const usuario = await new Usuario(data).save() //Persiste os dados
        await delete data.senha //remove a senha do objeto
        return data // retorna um objeto com os dados do usuário cadastrado
    }

    //Faz logon do usuário
    //Argumento é um objeto com as informações para acesso do usuário (email, senha)
    async logon(data){
        let senha = await new Cripto().crypt(data.senha) //criptografa senha

        //Busca o usuário no banco
        const usuario = await Usuario.query(qb => {
            qb.where({ senha: senha }).andWhere({email: data.email})
        }).fetch()
        
        //verifica se encontrou o usuário
        if(!usuario){
            return false;
        } else {
            let dados = JSON.parse(JSON.stringify(usuario))

            let dataToken = {email: dados.email, nome: dados.nome } 
            const token = await generateToken(dataToken) //Cria token

            await usuario.save({token: token}) //Armazena o token no usuário
            
            return {usuario: dataToken, token} //Retorna o usuário e o token
        }
    }

    //Faz logon do usuário
    //Argumento é um objeto com email do usuário e o token
    async logoff(token){

        //Busca o usuário no banco
        const usuario = await Usuario.query(qb => {
            qb.where({ token: token })
        }).fetch()
        
        //verifica se existe usuário
        if(!usuario){
            return false;
        } else {
            await usuario.save({token: ""})  //Remove token do usuário        
            return true
        }
    }
}

export default UsuarioRepository