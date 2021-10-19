import express from 'express'
import { router } from '../routes'

class ServerService {
  readonly PORT: number = global.config.port
  private app: express.Application

  constructor() {
    this.app = express()
    this.routes()
  }

  private routes(): void {
    this.app.use('/api', router)
  }

  public start(): void {
    this.app.listen(this.PORT)
    console.log('>> API: listening on port', this.PORT)
  }
}

export { ServerService }
