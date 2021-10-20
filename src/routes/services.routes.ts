import { Request, Response } from 'express'
import StatusCodes from 'http-status-codes'
import { endpoints } from '~ENTITY/enums'
import { ResourceRoutes } from '~ENTITY/class'

type TQueryServices = {
  origin: string
  destiny: string
  date: string
}

class ServicesRoutes extends ResourceRoutes {
  routesLoad() {
    this.router.get(endpoints.SERVICES, async (req: Request, res: Response) => {
      const endpoint = '/sb_search_schedules.php'
      const query = req.query as TQueryServices

      const xml = this.parser.xml(endpoint, {
        departure_city_id: query.origin,
        destination_city_id: query.destiny,
        departure_date: query.date
      })

      try {
        const { status, data } = await this.http.post(endpoint, xml)

        const response = data.error || data

        res.status(status).json(response)
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: (error as Error).message
        })
      }
    })
  }
}

export { ServicesRoutes }
