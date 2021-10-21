import { endpoints } from '~ENTITY/enums'
import { ResourceRoutes } from '~ENTITY/class'

class SeatsRoutes extends ResourceRoutes {
  routesLoad() {
    this.router.get(endpoints.SEATS_AVAILABLE, async (req, res, next) => {
      const endpoint = '/sb_available_seats.php'
      const query = req.query as TQuerySeatsAvailable

      const xml = this.parser.xml(endpoint, {
        id: query.serviceID,
        klass: query.seatType
      })

      try {
        const { status, data } = await this.http.post<TSeatsAvailableSOAP>(endpoint, xml)

        const response =
          data.error ||
          <TSeatsAvailable>{
            availableSeats: data.available_seats.toString()
          }

        res.status(status).json(response)
      } catch (error) {
        next(error)
      }
    })
  }
}

export { SeatsRoutes }
