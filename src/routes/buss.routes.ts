import { endpoints } from '~ENTITY/enums'
import { ResourceRoutes } from '~ENTITY/class'

class BussRoutes extends ResourceRoutes {
  routesLoad() {
    this.router.get(endpoints.BUS_STRUCTURE, async (req, res, next) => {
      const endpoint = '/sb_seat_map.php'
      const query = req.query

      const xml = this.parser.xml(endpoint, {
        id: query.serviceID
      })

      try {
        const { status, data } = await this.http.post(endpoint, xml)

        res.json(data)
      } catch (error) {
        next(error)
      }
    })
  }
}

export { BussRoutes }
