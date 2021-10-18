import { loadConfig } from '~UTILS/loadConfig'
import { Server } from './Server'

async function main() {
  try {
    await loadConfig()

    const server = new Server()
    server.start()
  } catch (error) {
    console.error('!!ERROR:', (error as Error).message)
  }
}

main()
