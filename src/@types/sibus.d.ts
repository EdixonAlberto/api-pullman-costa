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
