'use strict'

import crypto from 'crypto'
import variables from '../config/variables'

class Criptografia{
    constructor(){}

    //Metodo para encriptar a senha
    //O argumento é a senha em utf8
    //retorna a senha encriptografada 
    async crypt(text){
        const cipher = crypto.createCipher(variables.criptografia.alg, variables.criptografia.key)
        const crypted = cipher.update(text, variables.criptografia.cod, variables.criptografia.tipo)
        return crypted
    }

    //Metodo para desencriptar a senha
    //O argumento é a senha em utf8
    //retorna a senha desencriptografada 
    async decrypt(text){
        const decipher = crypto.createDecipher(variables.criptografia.alg, variables.criptografia.key)
        const pass = decipher.update(text, variables.criptografia.cod, variables.criptografia.tipo)
        return pass
    }
}

export default Criptografia