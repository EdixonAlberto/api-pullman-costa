import { Router, Request, Response } from 'express'
import StatusCodes from 'http-status-codes'
import axios from 'axios'
import fs from 'fs'
import { resolve } from 'path'
import xml2js from 'xml2js'

import { endpoints } from '~ENTITY/enums'
import { InterceptorAxios } from '~SERVICES/AxiosInterceptor'

const router = Router()
new InterceptorAxios()
const parser = new xml2js.Parser({
  trim: true
})

const xml = () => {
  const { user, password } = global.config.credentials

  return /* XML */ `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <ciudades>
          <user>${user}</user>
          <password>${password}</password>
        </ciudades>
      </soap:Body>
    </soap:Envelope>
  `.trim()
}

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
    try {
      const { data: xmlOut } = await axios.post('/sb_ciudades.php', xml())

      // descomposicion
      const js = await parser.parseStringPromise(xmlOut as string)
      const body = js['SOAP-ENV:Envelope']['SOAP-ENV:Body']
      const response = body[0]['ns1:ciudadesResponse']
      const _return = response[0].return
      const citiesSTR = _return[0]['_']
      const cities = JSON.parse(citiesSTR) as any[]

      // estructurar respuesta
      const citiesOverwrite = cities.map((city) => ({
        code: city.codigo,
        name: city.nombre
      }))

      res.status(StatusCodes.OK).json(citiesOverwrite)
    } catch (error) {
      console.error('ERROR ->', (error as Error).message)
    }
  }
)

// router.get(endpoints.ROUTES, (req: Request, res: Response): void => {
//   res.status(StatusCodes.OK).json({
//     data: []
//   })
// })

export { router }
