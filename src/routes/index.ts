import { Router } from 'express'

// SERVICES
import { InterceptorAxiosService } from '~SERVICES/InterceptorAxios.service'
import { ParserXMLService } from '~SERVICES/ParserXML.service'

// ROUTES
import { MainRoutes } from './main.routes'
import { CitiesRoutes } from './cities.routes'

const router = Router()
const parserXMLService = new ParserXMLService()
const interceptorAxiosService = new InterceptorAxiosService(parserXMLService)
const request = interceptorAxiosService.request

new MainRoutes(router)
new CitiesRoutes(router, request, parserXMLService)

export { router }
