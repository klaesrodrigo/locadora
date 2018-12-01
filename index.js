'use strict'

import app from './config/app'
import FilmeController from './controllers/filmeController'

const filme = new FilmeController();

app.get('/', filme.findDisponivel);
app.post('/', filme.findLikeTitulo);

app.listen(3000, console.log("Subiu"))
