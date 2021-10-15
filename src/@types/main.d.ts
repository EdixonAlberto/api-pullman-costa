type TConfig = {
  baseURL: string
  credentials: {
    user: string
    password: string
  }
  port: number
  modeDev: boolean
}

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {
    config: TConfig
  }
}
