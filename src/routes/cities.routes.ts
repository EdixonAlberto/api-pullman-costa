import { Router, Response } from 'express'
import { AxiosInstance } from 'axios'
import StatusCodes from 'http-status-codes'
import { endpoints } from '~ENTITY/enums'
import { ParserXMLService } from '~SERVICES/ParserXML.service'

class CitiesRoutes {
  constructor(
    public router: Router,
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
        const { status, data } = <TResponse<TCitySOAP[]>>(
          await this.request.post(endpoint, xml)
        )

        if (status === StatusCodes.OK) {
          const cities: TCity[] = data.map((city: TCitySOAP) => {
            return <TCity>{
              code: city.codigo.toString(),
              name: city.nombre
            }
          })

          res.status(status).json(cities)
        } else {
          res.status(status).json({
            code: data.codigo,
            error: data.error
          })
        }
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
        const { status, data } = <TResponse<TTramoSOAP[]>>(
          await this.request.post(endpoint, xml)
        )

        if (status === StatusCodes.OK) {
          const routes = data.map((tramo: TTramoSOAP) => {
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

          res.status(status).json(routes)
        } else {
          res.status(status).json({
            code: data.codigo,
            error: data.error
          })
        }
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: (error as Error).message
        })
      }
    })
  }
}

export { CitiesRoutes }
