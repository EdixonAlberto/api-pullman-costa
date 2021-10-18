import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { ParserXMLService } from '~SERVICES/ParserXML.service'

class InterceptorAxiosService {
  private endpoint: string = ''

  constructor(private parserXMLService: ParserXMLService) {
    axios.defaults.timeout = 1_000 * 10
    this.interceptorsInit()
  }

  private interceptorsInit(): void {
    // REQUEST
    axios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        config.baseURL = global.config.baseURL
        this.endpoint = config.url as string
        config.url = config.url + '?wsdl'
        config.headers = { 'Content-Type': 'text/xml; harset=utf-8' }

        return config
      },
      (error: AxiosError) => {
        console.error('!! ERROR-REQUEST-AXIOS:', error.message)
        throw new Error(error.response?.statusText)
      }
    )

    // RESPONSE
    axios.interceptors.response.use(
      async (response: AxiosResponse) => {
        const xml = response.data as string
        const responseJS = await this.parserXMLService.js(xml, this.endpoint)

        if (responseJS.codigo) {
          response.status = StatusCodes.BAD_REQUEST
        }

        response.data = responseJS

        return response
      },
      (error: AxiosError) => {
        console.error('!! ERROR-RESPONSE-AXIOS:', error.message)
        throw new Error(error.response?.statusText)
      }
    )
  }
}

export { InterceptorAxiosService }
