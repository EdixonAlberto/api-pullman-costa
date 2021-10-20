type TCredential = {
  user: string
  password: string
}

type TConfig = {
  baseURL: string
  credential: TCredential
  port: number
  modeDev: boolean
}

type TError = {
  error: {
    code: TErrorSOAP['codigo']
    error: string
  }
}

type TCity = {
  code: string
  name: string
}

type TRoute = {
  origin: TCity
  destiny: TCity
}

type TAxios = import('axios').Axios

/* INTERFACES___________________________________________________________________________*/

interface IHttp extends TAxios {
  post<T = unknown, R = import('axios').AxiosResponse<T & TError>, D = any>(
    url: string,
    data?: D,
    config?: import('axios').AxiosRequestConfig<D>
  ): Promise<R>
}

/* DECLARATIONS ________________________________________________________________________*/

declare namespace NodeJS {
  interface Global {
    config: TConfig
  }
}
