import { loadConfig } from '~UTILS/loadConfig'
import { ServerService } from '~SERVICES/Server.service'

async function main() {
  try {
    await loadConfig()

    const server = new ServerService()
    server.start()
  } catch (error) {
    console.error('!!ERROR:', (error as Error).message)
  }
}

main()
