'use strict'

import bookshelf from '../config/bookshelf';
import Usuario from '../models/Usuario';

const Filme = bookshelf.Model.extend({
    tableName: 'filme',
    usuario: function(){
        return this.belongsToMany(Usuario, 'filme_usuario','filme_id', 'usuario_id')
    }
})

export default Filme;