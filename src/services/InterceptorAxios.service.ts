import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance
} from 'axios'
import { StatusCodes } from 'http-status-codes'
import { ParserXMLService } from '~SERVICES/ParserXML.service'

class InterceptorAxiosService {
  private endpoint: string = ''
  public request: AxiosInstance

  constructor(private parserXMLService: ParserXMLService) {
    this.request = axios.create({
      timeout: 1_000 * 10 // Timeout of 10 seconds
    })
    this.interceptorsInit()
  }

  private interceptorsInit(): void {
    // REQUEST
    this.request.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        config.baseURL = global.config.baseURL
        this.endpoint = config.url as string
        config.url = config.url + '?wsdl'
        config.headers = {
          'Content-Type': 'text/xml; harset=utf-8',
          ...config.headers
        }

        return config
      },
      (error: AxiosError) => {
        console.error('!! ERROR-REQUEST-AXIOS:', error.message)
        throw new Error(error.response?.statusText)
      }
    )

    // RESPONSE
    this.request.interceptors.response.use(
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
