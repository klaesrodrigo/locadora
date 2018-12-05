'use strict'

const knex = require('knex')(require('../dao/config'));
const bookshelf = require('bookshelf')(knex);

export default bookshelf;