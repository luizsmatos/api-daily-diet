import fastify from 'fastify'

import { usersRoutes } from './http/controllers/users/routes'

const app = fastify()

app.register(usersRoutes)

export { app }
