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
