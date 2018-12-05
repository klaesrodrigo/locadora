'use strict'

//Arquivo onde ficam armazenados as variables do sistema
const variables = {
    api: {
        port: process.env.port || 3000
    },
    criptografia:{
        alg: 'aes-256-ctr',
        key: 'ArbD12s3-KkK77p',
        cod: 'utf8',
        tipo: 'hex'
    }   
}

export default variables