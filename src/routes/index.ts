import { Router, Request, Response } from 'express'
import StatusCodes from 'http-status-codes'
import axios from 'axios'
import fs from 'fs'
import { resolve } from 'path'

import { endpoints } from '~ENTITY/enums'
import { InterceptorAxiosService } from '~SERVICES/InterceptorAxios.service'
import { ParserXMLService } from '~SERVICES/ParserXML.service'

const router = Router()

router.get(endpoints.API, (_, res: Response): void => {
  const pkg = JSON.parse(fs.readFileSync(resolve('package.json'), 'utf8'))

  res.status(StatusCodes.OK).json({
    data: {
      name: 'Api Pullman Costa',
      version: pkg.version,
      currentDate: new Date().toISOString()
    }
  })
})

router.get(
  endpoints.CITIES,
  async (_, res: Response): Promise<void> => {
    const parserXMLService = new ParserXMLService(global.config.credential)
    new InterceptorAxiosService(parserXMLService)

    const xml = parserXMLService.xml()

    try {
      const { status, data } = <TResponse<TCitySOAP[]>>(
        await axios.post('/sb_ciudades.php', xml)
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
  }
)

export { router }
