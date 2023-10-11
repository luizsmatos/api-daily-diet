import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeDeleteMealUseCase } from '@/use-cases/meals/factories/make-delete-meal-usecase'

export async function deleteMealController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const deleteParamsSchema = z.object({
    mealId: z.string(),
  })

  const { mealId } = deleteParamsSchema.parse(request.params)

  const useCase = makeDeleteMealUseCase()

  await useCase.execute({
    userId: request.user.sub,
    mealId,
  })

  return reply.status(204).send()
}
