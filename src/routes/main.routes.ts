import { Router, Response } from 'express'
import StatusCodes from 'http-status-codes'
import fs from 'fs'
import { resolve } from 'path'
import { endpoints } from '~ENTITY/enums'

class MainRoutes {
  constructor(private router: Router) {
    this.routesStart()
  }

  private routesStart(): void {
    this.router.get(endpoints.API, (_, res: Response): void => {
      const pkg = JSON.parse(fs.readFileSync(resolve('package.json'), 'utf8'))

      res.status(StatusCodes.OK).json({
        name: pkg.name,
        version: pkg.version,
        currentDate: new Date().toISOString()
      })
    })
  }
}

export { MainRoutes }
