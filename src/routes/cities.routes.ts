import { Router, Response, response } from 'express'
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
      const xml = this.parser.xml()

      try {
        const { status, data } = <TResponse<TCitySOAP[]>>(
          await this.request.post('/sb_ciudades.php', xml)
        )

        if (status === StatusCodes.OK) {
          const cities: TCity[] = data.map((city: TCitySOAP) => ({
            code: city.codigo.toString(),
            name: city.nombre
          }))

          res.status(StatusCodes.OK).json(cities)
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
      const xml = this.parser.xml()

      try {
        const { status, data } = <TResponse<object>>(
          await this.request.post('/sb_tramos.php', xml)
        )

        console.log(status, data)
      } catch (error) {}

      res.end()
    })
  }
}

export { CitiesRoutes }
