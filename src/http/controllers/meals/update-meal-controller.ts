import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateMealUseCase } from '@/use-cases/meals/factories/make-update-meal-usecase'
import { MealNotFoundError } from '@/use-cases/meals/errors/meal-not-found-error'
import { NotAllowedError } from '@/use-cases/meals/errors/not-allowed-error'

export async function updateMealController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const updateParamsSchema = z.object({
    mealId: z.string().uuid(),
  })

  const { mealId } = updateParamsSchema.parse(request.params)

  const updateBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    date: z.string().datetime(),
    isInDiet: z.boolean(),
  })

  const body = updateBodySchema.parse(request.body)

  try {
    const useCase = makeUpdateMealUseCase()

    await useCase.execute({
      userId: request.user.sub,
      mealId,
      data: body,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof MealNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof NotAllowedError) {
      return reply.status(405).send({ message: err.message })
    }

    throw err
  }
}
