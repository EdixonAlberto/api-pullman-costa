import { StatusCodes } from 'http-status-codes'

export enum endpoints {
  // MAIN ________________________________________________________________________________
  API = '/',

  // CITIES ______________________________________________________________________________
  CITIES = '/cities',
  ROUTES = '/routes',

  // SERVICES ____________________________________________________________________________
  SERVICES = '/services',
  SEATS_AVAILABLE = '/seats_available',

  // BUSS ________________________________________________________________________________
  BUS_STRUCTURE = '/bus_structure',
  BUS_STOPS = '/take_stop',

  // SEATS _______________________________________________________________________________
  VALIDATE_SEAT = '/validate_seat',
  TAKE_SEAT = '/take_seat',
  LIBERATE_SEAT = '/liberate_ticket',

  // TICKETS _____________________________________________________________________________
  RESERVE_TICKET = '/reserve_ticket',
  CONFIRM_TICKET = '/confirm_ticket',
  STATUS_TICKET = '/status_ticket',
  CANCEL_TICKET = '/cancel_ticket',

  // USERS _______________________________________________________________________________
  AGREEMENT = '/agreement'
}

export enum errorsSOAP {
  '01' = StatusCodes.BAD_REQUEST,
  '02' = StatusCodes.INTERNAL_SERVER_ERROR,
  '03' = StatusCodes.NOT_FOUND
}
