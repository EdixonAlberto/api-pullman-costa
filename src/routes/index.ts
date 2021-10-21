import { Router } from 'express'
import { MainRoutes } from './main.routes'
import { CitiesRoutes } from './cities.routes'
import { ServicesRoutes } from './services.routes'
import { SeatsRoutes } from './seats.routes'
import { BussRoutes } from './buss.routes'

const router = Router()

new MainRoutes(router)
new CitiesRoutes(router)
new ServicesRoutes(router)
new SeatsRoutes(router)
new BussRoutes(router)

export { router }
