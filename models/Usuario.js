'use strict'

import bookshelf from '../config/bookshelf';
import Filme from '../models/Filme';

//rederiza o model a partir da tabela do banco
const Usuario = bookshelf.Model.extend({
    tableName: 'usuario',
    filme: function(){
        return this.belongsToMany(Filme, 'filme_usuario','filme_id', 'usuario_id') // identifica relacionamento
    }

})

export default Usuario;