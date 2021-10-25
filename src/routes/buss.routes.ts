import { endpoints } from '~ENTITY/enums'
import { ResourceRoutes } from '~ENTITY/class'

class BussRoutes extends ResourceRoutes {
  routesLoad() {
    this.router.get(endpoints.BUS_STRUCTURE, async (req, res, next) => {
      const endpoint = '/sb_seat_map.php'
      const query = req.query as TQueryBusStructure

      const xml = this.parser.xml(endpoint, {
        id: query.serviceID
        // TODO: agregar parametro para cambiar la disposicion de los asientos en la estructura del bus
        // orientation: 'vertical' || 'orizontal'
      })

      try {
        const { status, data } = await this.http.post<TSeatSOAP[]>(endpoint, xml)
        let response: TBusStructure | TError = { 1: [], 2: [] }

        if (data.error) response = data.error
        else {
          const FLOORS: number[] = [1, 2]

          // TODO: completar logica para armar la estructura del bus como en pullman
          FLOORS.forEach((floor: number) => {
            const rows = data.filter((seat: TSeatSOAP) => seat.floor === floor)

            let start: boolean = true
            let order: number = 1

            while (start) {
              const cols = rows.filter((seat: TSeatSOAP) => seat.order === order)

              if (cols.length) {
                const seats = cols.map((seat: TSeatSOAP) => {
                  return <TSeat>{
                    seat: seat.seat_klass === 'BLANCO' ? '' : seat.seat.toString(),
                    state:
                      seat.seat_klass === 'BLANCO'
                        ? 'pasillo'
                        : seat.available
                        ? 'libre'
                        : 'ocupado',
                    floor: seat.floor,
                    type: seat.seat_klass,
                    price: seat.price,
                    priceMoreDiscount: Number.parseInt(seat.price_tachada)
                  }
                })

                response[floor].push(seats)
                order++
              } else start = false
            }
          })
        }

        res.status(status).json(response)
      } catch (error) {
        next(error)
      }
    })
  }
}

export { BussRoutes }
