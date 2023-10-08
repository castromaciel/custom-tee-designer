import express, { type Application } from 'express'

class Server {
  private readonly app: Application
  private readonly port: string | number

  constructor () {
    this.app = express()
    this.port = process.env.PORT ?? '8000'

    this.routes()
  }

  routes (): void {
    this.app.use('/', (req, res) => {
      res.json({
        message: 'Oops!.. Wrong url!'
      })
    })
  }

  listen (): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

export default Server
