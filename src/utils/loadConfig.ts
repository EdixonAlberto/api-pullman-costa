export async function loadConfig(): Promise<void> {
  if (process.env.NODE_ENV !== 'production') {
    // Cargar variables de entorno desde el archivo: ".env"
    const result = (await import('dotenv')).config({ path: '.env' })
    if (result.error) throw result.error
    else console.log('>> ENV: file .env read successfully')
  }
  const ENV: NodeJS.ProcessEnv = process.env

  const config: TConfig = {
    baseURL:
      'https://pullman-ws-web-costacentral.azurewebsites.net/ws/ws_pbus/pbus_ws_pcosta',
    credentials: {
      user: ENV.USER || '',
      password: ENV.PASSWORD || ''
    },
    port: Number(ENV.PORT) || 5000,
    modeDev: ENV.NODE_ENV !== 'production'
  }

  global.config = config
  console.log('>> CONFIG: loaded successfully')
}
