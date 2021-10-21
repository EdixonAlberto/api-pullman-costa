import express from 'express'
import { router } from '../routes'
import { errorHandler } from '../middleware'

class ServerService {
  readonly PORT: number = global.config.port
  private app: express.Application

  constructor() {
    this.app = express()
    this.routes()
    this.middlewareOUT()
  }

  private routes(): void {
    this.app.use('/api', router)
  }

  private middlewareOUT(): void {
    this.app.use(errorHandler)
  }

  public start(): void {
    this.app.listen(this.PORT)
    console.log('>> API: listening on port', this.PORT)
  }
}

export { ServerService }
