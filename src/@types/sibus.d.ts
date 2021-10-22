type TErrorSOAP = {
  codigo: '01' | '02' | '03'
  error: string
}

type TCitySOAP = {
  codigo: number
  nombre: string
}

type TTramoSOAP = {
  ciudador: number
  ciudaddes: number
  origen: string
  destino: string
}

type TSchedulesSOAP = {
  id: number
  codigo_empresa: string
  bus_operator_name: string
  departs_at: string
  arrives_at: string
  price: number
  price_tachada: string
  seat_klass: string
  seat_dispo: number
  mascotas: boolean
}

type TSeatsAvailableSOAP = {
  available_seats: number
}

type TSeatSOAP = {
  cell: number //  número de columna de izq a der
  order: number //  número de fila
  typeseat: number // tipo de asiento, si es 0, 10 o superior no es un asiento valido, solo sirve para el trabajo de diseño
  floor: number //  número de piso
  type: string // tipo de asiento
  seat: number // número de asiento
  seat_klass: string // tipo de asiento como texto
  price: number // precio de este asiento
  price_tachada: string // precio de este asiento con descuento
  available: boolean // indica si el asiento está disponible
}
