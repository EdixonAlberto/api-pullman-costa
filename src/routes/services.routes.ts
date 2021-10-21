import { endpoints } from '~ENTITY/enums'
import { ResourceRoutes } from '~ENTITY/class'
import { getDate } from '~UTILS/time.utils'

class ServicesRoutes extends ResourceRoutes {
  routesLoad() {
    this.router.get(endpoints.SERVICES, async (req, res, next) => {
      const endpoint = '/sb_search_schedules.php'
      const query = req.query as TQueryServices

      const xml = this.parser.xml(endpoint, {
        departure_city_id: query.originID,
        destination_city_id: query.destinyID,
        departure_date: getDate(query.dateISO).sibus
      })

      try {
        const { status, data } = await this.http.post<TSchedulesSOAP[]>(endpoint, xml)

        const response =
          data.error ||
          data.map((service: TSchedulesSOAP) => {
            return <TService>{
              serviceID: service.id.toString(),
              companyID: service.codigo_empresa,
              companyName: service.bus_operator_name,
              departureDate: getDate(service.departs_at).iso,
              arrivalDate: getDate(service.arrives_at).iso,
              price: service.price,
              priceMoreDiscount: Number.parseInt(service.price_tachada),
              seatType: service.seat_klass,
              availableSeats: service.seat_dispo,
              pets: service.mascotas
            }
          })

        res.status(status).json(response)
      } catch (error) {
        next(error)
      }
    })
  }
}

export { ServicesRoutes }
