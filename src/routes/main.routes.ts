import StatusCodes from 'http-status-codes'
import fs from 'fs'
import { resolve } from 'path'
import { endpoints } from '~ENTITY/enums'
import { ResourceRoutes } from '~ENTITY/class'

class MainRoutes extends ResourceRoutes {
  routesLoad() {
    this.router.get(endpoints.API, (_, res) => {
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
