'use strict'

import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario'
import variables from '../config/variables'

exports.generateToken = async (data) => {
    return jwt.sign(data, variables.criptografia.key, {
        expiresIn: '1d'
    })
}

exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, key)
    return data
}

exports.authorize = async (req, res, next) => {
    let token = req.headers['token']

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        })
    } else {

        let usuario = await Usuario.where({token: token}).fetch();

        if (!usuario) {
            res.status(401).json({
                message: 'Token Inválido'
            })
        } else {

            jwt.verify(token, variables.criptografia.key, (error, decoded) => {
                if (error) {
                    res.status(401).json({
                        message: 'Token Inválido'
                    })
                } else {
                    next()
                }
            })
        }
    }
}