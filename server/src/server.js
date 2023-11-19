const cors = require('cors')
const express = require('express')

const dallesRoutes = require('./routes/dalle.routes.js')

class Server {
  app

  port = '8000'

  apiVersion = '/api/v1/dalle'

  constructor() {
    this.app = express()
    this.port = process.env.PORT ?? '8000'

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json({ limit: '50mb' }))
  }

  routes() {
    this.app.use(this.apiVersion, dallesRoutes)
    this.app.use('/', (req, res) => {
      res.json({
        message: 'Oops!.. Wrong url!'
      })
    })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

module.exports = Server;

