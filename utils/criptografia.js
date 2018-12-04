import crypto from 'crypto'
const alg = 'aes-256-ctr'
const pwd = 'cbacba'

class Criptografia{
    constructor(){}

    async crypt(text){
        const cipher = crypto.createCipher(alg, pwd)
        const crypted = cipher.update(text, 'utf8', 'hex')
        return crypted
    }

    async decrypt(text){
        const decipher = crypto.createDecipher(alg, pwd)
        const pass = decipher.update(text, 'hex', 'utf8')
        return pass
    }
}

export default Criptografia