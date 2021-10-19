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

type TResponse<D> = {
  status: number
  data: D & TErrorSOAP
}

type TCity = {
  code: string
  name: string
}

type TRoute = {
  origin: TCity
  destiny: TCity
}

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {
    config: TConfig
  }
}
