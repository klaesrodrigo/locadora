'use strict'

//conectado com o banco
const knex = require('knex')(require('../db/db-config'));
//Relacionana o ORM com o banco
const bookshelf = require('bookshelf')(knex);

export default bookshelf;