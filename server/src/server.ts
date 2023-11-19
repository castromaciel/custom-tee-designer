import cors from 'cors'
import express, { type Application } from 'express'

import dallesRoutes from './routes/dalle.routes'

class Server {
  private readonly app: Application

  private readonly port: string | number

  private readonly apiVersion = '/api/v1/dalle'

  constructor() {
    this.app = express()
    this.port = process.env.PORT ?? '8000'

    this.middlewares()
    this.routes()
  }

  middlewares(): void {
    this.app.use(cors())
    this.app.use(express.json({ limit: '50mb' }))
  }

  routes(): void {
    this.app.use(this.apiVersion, dallesRoutes)
    this.app.use('/', (req, res) => {
      res.json({
        message: 'Oops!.. Wrong url!'
      })
    })
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

export default Server
