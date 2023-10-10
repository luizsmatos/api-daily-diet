import fastify from 'fastify'
import { ZodError } from 'zod'

import { usersRoutes } from './http/controllers/users/routes'
import { env } from './env'

const app = fastify()

app.register(usersRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

export { app }
