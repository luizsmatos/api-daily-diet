import { FastifyInstance } from 'fastify'

import { registerUserController } from './register-user-controller'
import { authenticateUserController } from './authenticate-user-controller'

export async function usersRoutes(app: FastifyInstance): Promise<void> {
  app.post('/users', registerUserController)
  app.post('/sessions', authenticateUserController)
}
