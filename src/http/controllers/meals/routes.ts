import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { createMealController } from './create-meal-controller'

export async function mealsRoutes(app: FastifyInstance): Promise<void> {
  app.post('/meals', { onRequest: [verifyJWT] }, createMealController)
}
