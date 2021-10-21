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

type TDateFomats = {
  iso: string
  sibus: string
}

type TError = {
  code: TErrorSOAP['codigo']
  error: string
}

type TCity = {
  code: string
  name: string
}

type TRoute = {
  origin: TCity
  destiny: TCity
}

type TQueryServices = {
  originID: string
  destinyID: string
  dateISO: string
}

type TService = {
  serviceID: string
  companyID: string
  companyName: string
  departureDate: string
  arrivalDate: string
  price: number // Precio internet: precio final a pagar
  priceMoreDiscount: number // Precio + descuento: precio informativo para tachar en la app
  seatType: string
  availableSeats: number
  pets: boolean
}

type TQuerySeatsAvailable = {
  serviceID: string
  seatType: string
}

type TSeatsAvailable = {
  availableSeats: string
}

type TAxios = import('axios').Axios

/* INTERFACES __________________________________________________________________________*/

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
