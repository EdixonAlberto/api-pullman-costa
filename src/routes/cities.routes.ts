import { Router, Response } from 'express'
import { AxiosInstance } from 'axios'
import StatusCodes from 'http-status-codes'
import { endpoints } from '~ENTITY/enums'
import { ParserXMLService } from '~SERVICES/ParserXML.service'

class CitiesRoutes {
  constructor(
    private router: Router,
    private request: AxiosInstance,
    private parser: ParserXMLService
  ) {
    this.routesLoad()
  }

  private routesLoad(): void {
    this.router.get(endpoints.CITIES, async (_, res: Response) => {
      const endpoint = '/sb_ciudades.php'
      const xml = this.parser.xml(endpoint)

      try {
        const { status, data } = await this.request.post<TCitySOAP[]>(endpoint, xml)
        let cities: TCity[] | null = null

        if (status === StatusCodes.OK) {
          cities = data.map((city: TCitySOAP) => {
            return <TCity>{
              code: city.codigo.toString(),
              name: city.nombre
            }
          })
        }

        res.status(status).json(cities || data)
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: (error as Error).message
        })
      }
    })

    this.router.get(endpoints.ROUTES, async (_, res: Response) => {
      const endpoint = '/sb_tramos.php'
      const xml = this.parser.xml(endpoint)

      try {
        const { status, data } = await this.request.post<TTramoSOAP[]>(endpoint, xml)
        let routes: TRoute[] | null = null

        if (status === StatusCodes.OK) {
          routes = data.map((tramo: TTramoSOAP) => {
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
        }

        res.status(status).json(routes || data)
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: (error as Error).message
        })
      }
    })
  }
}

export { CitiesRoutes }
