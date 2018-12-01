'use strict'

import bookshelf from '../config/bookshelf';
import Filme from '../models/Filme';

const Usuario = bookshelf.Model.extend({
    tableName: 'usuario',
    filme: function(){
        return this.belongsToMany(Filme, 'filme_usuario','filme_id', 'usuario_id')
    }

})

export default Usuario;