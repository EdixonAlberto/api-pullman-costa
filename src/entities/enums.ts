import { StatusCodes } from 'http-status-codes'

export enum endpoints {
  API = '/',
  CITIES = '/cities',
  ROUTES = '/routes',
  SERVICES = '/services',
  SEATS_AVAILABLE = '/seats_available'
}

export enum errorsSOAP {
  '01' = StatusCodes.BAD_REQUEST,
  '02' = StatusCodes.INTERNAL_SERVER_ERROR,
  '03' = StatusCodes.NOT_FOUND
}
