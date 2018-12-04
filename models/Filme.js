'use strict'

import bookshelf from '../config/bookshelf';
import Usuario from '../models/Usuario';

const Filme = bookshelf.Model.extend({
    tableName: 'filme',
    usuario: function(){
        return this.belongsToMany(Usuario, 'usuario_has_filme','filme_id', 'usuario_id')
    }
})

export default Filme;