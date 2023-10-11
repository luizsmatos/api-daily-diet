import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetMealUseCase } from '@/use-cases/meals/factories/make-get-meal-usecase'
import { MealNotFoundError } from '@/use-cases/meals/errors/meal-not-found-error'

export async function getMealController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const getParamsSchema = z.object({
    mealId: z.string().uuid(),
  })

  const { mealId } = getParamsSchema.parse(request.params)

  try {
    const useCase = makeGetMealUseCase()

    const { meal } = await useCase.execute({ mealId })

    return reply.status(200).send({ meal })
  } catch (err) {
    if (err instanceof MealNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
