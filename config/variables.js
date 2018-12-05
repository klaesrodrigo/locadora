'use strict'
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