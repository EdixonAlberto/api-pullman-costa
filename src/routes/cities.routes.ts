import { endpoints } from '~ENTITY/enums'
import { ResourceRoutes } from '~ENTITY/class'

class CitiesRoutes extends ResourceRoutes {
  routesLoad() {
    this.router.get(endpoints.CITIES, async (_, res, next) => {
      const endpoint = '/sb_ciudades.php'
      const xml = this.parser.xml(endpoint)

      try {
        const { status, data } = await this.http.post<TCitySOAP[]>(endpoint, xml)

        const response =
          data.error ||
          data.map((city: TCitySOAP) => {
            return <TCity>{
              code: city.codigo.toString(),
              name: city.nombre
            }
          })

        res.status(status).json(response)
      } catch (error) {
        next(error)
      }
    })

    this.router.get(endpoints.ROUTES, async (_, res, next) => {
      const endpoint = '/sb_tramos.php'
      const xml = this.parser.xml(endpoint)

      try {
        const { status, data } = await this.http.post<TTramoSOAP[]>(endpoint, xml)

        const response =
          data.error ||
          data.map((tramo: TTramoSOAP) => {
            return <TRoute>{
              origin: {
                code: tramo.ciudador.toString(),
                name: tramo.origen
              },
              destiny: {
                code: tramo.ciudaddes.toString(),
                name: tramo.destino
              }
            }
          })

        res.status(status).json(response)
      } catch (error) {
        next(error)
      }
    })
  }
}

export { CitiesRoutes }
