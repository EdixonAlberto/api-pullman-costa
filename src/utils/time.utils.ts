export function getDate(date: string): TDateFomats {
  /*
    Formato Universal ISO: 2021-10-25T15:15:00.000Z
    Formato Sibus: 25-10-2021
  */
  const dateISO = new Date(date)
  const [dateLocale] = dateISO.toLocaleString('es').split(' ')
  const dateSibus = dateLocale.split('/').join('-')

  return {
    iso: dateISO.toISOString(),
    sibus: dateSibus
  }
}
