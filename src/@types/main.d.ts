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

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {
    config: TConfig
  }
}
