import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateMealUseCase } from '@/use-cases/meals/factories/make-create-meal-usecase'

export async function createMealController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  request.jwtVerify()

  const createBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    date: z.string().datetime(),
    isInDiet: z.boolean(),
  })

  const body = createBodySchema.parse(request.body)

  const useCase = makeCreateMealUseCase()

  const { meal } = await useCase.execute({
    userId: request.user.sub,
    ...body,
  })

  return reply.status(201).send({ meal })
}
