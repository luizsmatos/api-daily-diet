import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/use-cases/meals/factories/make-get-user-metrics-usecase'

export async function getUserMetricsController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const useCase = makeGetUserMetricsUseCase()

  const {
    totalMealsRecorded,
    totalMealsInDiet,
    totalMealsOutsideDiet,
    bestSequenceMealsInDiet,
  } = await useCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    summary: {
      totalMealsRecorded,
      totalMealsInDiet,
      totalMealsOutsideDiet,
      bestSequenceMealsInDiet,
    },
  })
}
