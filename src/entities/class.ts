import { Router } from 'express'
import { InterceptorAxiosService } from '~SERVICES/InterceptorAxios.service'
import { ParserXMLService } from '~SERVICES/ParserXML.service'

export class ResourceRoutes {
  protected http: IHttp
  protected parser: ParserXMLService

  constructor(protected router: Router) {
    const parserXMLService = new ParserXMLService()
    const interceptorAxiosService = new InterceptorAxiosService(parserXMLService)

    this.http = interceptorAxiosService.http
    this.parser = parserXMLService
    this.routesLoad()
  }

  routesLoad(): void {}
}
