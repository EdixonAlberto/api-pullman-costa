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

type TCity = {
  code: string
  name: string
}

type TResponse<D> = {
  status: number
  data: D & TErrorSOAP
}

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {
    config: TConfig
  }
}
