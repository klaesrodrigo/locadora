'use strict'

const knex = require('knex')(require('../dao/DAO-config'));
const bookshelf = require('bookshelf')(knex);

export default bookshelf;