import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

class InterceptorAxios {
  constructor() {
    axios.defaults.timeout = 1_000 * 10
    this.interceptorsInit()
  }

  private interceptorsInit(): void {
    // REQUEST
    axios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        config.baseURL = global.config.baseURL
        config.url = config.url + '?wsdl'
        config.headers = { 'Content-Type': 'text/xml; harset=utf-8' }

        if (global.config.modeDev) {
          console.log('LOG-REQUEST', {
            baseURL: config.baseURL,
            url: config.url,
            headers: config.headers
          })
        }
        return config
      },
      (error: AxiosError) => {
        if (global.config.modeDev) {
          console.error('ERROR-REQUEST-AXIOS', error.message)
        }
        return { data: null }
      }
    )

    // RESPONSE
    axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (global.config.modeDev) {
          console.error('ERROR-RESPONSE-AXIOS', error.message)
        }
        return { data: null }
      }
    )
  }
}

export { InterceptorAxios }
