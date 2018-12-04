'use strict'

import app from './config/app'
import FilmeController from './controllers/filmeController'

const filme = new FilmeController();

app.get('/', filme.findDisponivel);
app.post('/', filme.findLikeTitulo);
app.post('/locar/', filme.locaFilme);
app.post('/devolver/', filme.devolveFilme);

app.listen(3000, console.log("Subiu"))
