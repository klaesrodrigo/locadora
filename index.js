'use strict'

import app from './config/app'
import routes from './routes/index'

routes(app)

app.listen(3000, console.log("Subiu"))
