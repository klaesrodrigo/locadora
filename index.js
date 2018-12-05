'use strict'

import app from './config/app'
import routes from './routes/index'
import variables from './config/variables'

routes(app)
app.listen(variables.api.port, console.log(`API RUN!! Port: ${variables.api.port}`))
