import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance
} from 'axios'
import { StatusCodes } from 'http-status-codes'
import { errorsSOAP } from '~ENTITY/enums'
import { ParserXMLService } from '~SERVICES/ParserXML.service'

class InterceptorAxiosService {
  private endpoint: string = ''
  public http: AxiosInstance

  constructor(private parserXMLService: ParserXMLService) {
    this.http = axios.create({
      timeout: 1_000 * 10 // Timeout of 10 seconds
    })
    this.interceptorsInit()
  }

  private interceptorsInit(): void {
    // REQUEST
    this.http.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        config.baseURL = global.config.baseURL
        this.endpoint = config.url as string
        config.url = config.url + '?wsdl'
        config.headers = {
          'Content-Type': 'text/xml; harset=utf-8',
          ...config.headers
        }

        if (global.config.modeDev) {
          console.log('>> ' + config.method?.toUpperCase() + ': ' + config.url)
        }

        return config
      },
      (error: AxiosError) => {
        console.error('!! ERROR-REQUEST-AXIOS:', error.message)
        throw new Error(error.response?.statusText)
      }
    )

    // RESPONSE
    this.http.interceptors.response.use(
      async (response: AxiosResponse) => {
        const xml = response.data as string
        const responseJS = await this.parserXMLService.js(xml, this.endpoint)

        if (responseJS.codigo === '02') {
          throw <TError>{
            code: responseJS.codigo,
            error: responseJS.error
          }
        } else if (responseJS.codigo) {
          response.status = errorsSOAP[responseJS.codigo]

          response.data = {
            error: <TError>{
              code: responseJS.codigo,
              error: responseJS.error
            }
          }
        } else response.data = responseJS

        return response
      },
      (error: AxiosError) => {
        console.error('!! ERROR-RESPONSE-AXIOS:', error.message)

        throw <TError>{
          code: StatusCodes.INTERNAL_SERVER_ERROR.toString(),
          error: error.message
        }
      }
    )
  }
}

export { InterceptorAxiosService }
