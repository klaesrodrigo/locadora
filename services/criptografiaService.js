'use strict'

import crypto from 'crypto'
import variables from '../config/variables'

class Criptografia{
    constructor(){}

    async crypt(text){
        const cipher = crypto.createCipher(variables.criptografia.alg, variables.criptografia.key)
        const crypted = cipher.update(text, variables.criptografia.cod, variables.criptografia.tipo)
        return crypted
    }

    async decrypt(text){
        const decipher = crypto.createDecipher(variables.criptografia.alg, variables.criptografia.key)
        const pass = decipher.update(text, variables.criptografia.cod, variables.criptografia.tipo)
        return pass
    }
}

export default Criptografia