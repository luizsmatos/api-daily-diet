import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListMealsUseCase } from '@/use-cases/meals/factories/make-list-meals-usecase'

export async function listMealsController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const useCase = makeListMealsUseCase()

  const { meals } = await useCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ meals })
}
