import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { createMealController } from './create-meal-controller'
import { updateMealController } from './update-meal-controller'
import { deleteMealController } from './delete-meal-controller'
import { getMealController } from './get-meal-controller'

export async function mealsRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', verifyJWT)

  app.post('/meals', createMealController)
  app.patch('/meals/:mealId', updateMealController)
  app.delete('/meals/:mealId', deleteMealController)
  app.get('/meals/:mealId', getMealController)
}
