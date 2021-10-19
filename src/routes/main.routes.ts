import { Response } from 'express'
import StatusCodes from 'http-status-codes'
import fs from 'fs'
import { resolve } from 'path'
import { endpoints } from '~ENTITY/enums'
import { ResourceRoutes } from '~ENTITY/class'

class MainRoutes extends ResourceRoutes {
  routesStart() {
    this.router.get(endpoints.API, (_, res: Response) => {
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
