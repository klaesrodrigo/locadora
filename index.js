'use strict'

import app from './config/app'
import routes from './routes/routes'
import variables from './config/variables'

//Roteamento é feito atraves do arquivo index.js na pasta routes
routes(app)

app.listen(variables.api.port, console.log(`API RUN!! Port: ${variables.api.port}`))
