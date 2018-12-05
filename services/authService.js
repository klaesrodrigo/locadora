'use strict'

import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario'
import variables from '../config/variables'

//Metodo para gerar token
//O argumento é um objeto que será incluido no token
//retorna o token
exports.generateToken = async (data) => {
    return jwt.sign(data, variables.criptografia.key, {
        expiresIn: '1d'
    })
}

//Metodo para gerar token
//O argumento é o token
//retorna os dados do token
exports.decodeToken = async (token) => {
    let data = await jwt.decode(token, key)
    return data
}


//Metodo para verificar se o usuário está autorizado a fazer a request para a rota
exports.authorize = async (req, res, next) => {
    
    //Recebe o token pelo header. Exemplo {token: 'asd1252sad252as2d15a22'}
    let token = req.headers['token']

    //verifica se o token foi passado por parametro
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        })
    } 
    else {

        //busca o usuário associado ao token
        let usuario = await Usuario.where({token: token}).fetch();

        //Verifica se o usuário foi encontrado, caso não seja, o token é inválido
        if (!usuario) {
            res.status(400).json({
                message: 'Token Inválido'
            })
        } else {

            //Verifica se o token não está expirado 
            jwt.verify(token, variables.criptografia.key, (error, decoded) => {
                if (error) {
                    res.status(401).json({
                        message: 'Token Inválido'
                    })
                } else {
                    //Caso tudo estiver correto, o usuário esta aurizado a seguir na request
                    next()
                }
            })
        }
    }
}