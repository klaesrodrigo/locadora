'use strict'

import bookshelf from '../config/bookshelf';
import Usuario from '../models/Usuario';

//rederiza o model a partir da tabela do banco
const Filme = bookshelf.Model.extend({
    tableName: 'filme',
    usuario: function(){
        return this.belongsToMany(Usuario, 'usuario_has_filme','filme_id', 'usuario_id') // identifica relacionamento
    }
})

export default Filme