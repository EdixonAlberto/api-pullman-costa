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
          const COLS: number[] = [4, 3, 2, 1]

          // TODO: completar logica para armar la estructura del bus como en pullman
          FLOORS.forEach((floorNro: number) => {
            const rows = data.filter((seat: TSeatSOAP) => seat.floor === floorNro)

            rows.forEach((row: TSeatSOAP) => {
              console.log(row.seat)
            })

            // <TSeat>{
            //   seat: seat.seat_klass === 'BLANCO' ? '' : seat.seat,
            //   state:
            //     seat.seat_klass === 'BLANCO'
            //       ? 'pasillo'
            //       : seat.available
            //       ? 'libre'
            //       : 'ocupado',
            //   floor: seat.floor,
            //   type: seat.seat_klass,
            //   price: seat.price,
            //   priceMoreDiscount: Number.parseInt(seat.price_tachada)
            // }

            // response[floorNro].push()
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
