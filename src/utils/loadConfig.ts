export async function loadConfig(): Promise<void> {
  if (process.env.NODE_ENV !== 'production') {
    // Cargar variables de entorno desde el archivo: ".env"
    const result = (await import('dotenv')).config({ path: '.env' })
    if (result.error) throw result.error
  }
  const ENV: NodeJS.ProcessEnv = process.env

  const config: TConfig = {
    port: Number(ENV.PORT) || 5000
  }

  global.config = config
  console.log('>> CONFIG: loaded successfully')
}
