import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeAuthenticateUserUseCase } from '@/use-cases/users/factories/make-authenticate-user-usecase'
import { InvalidCredentialsError } from '@/use-cases/users/errors/invalid-credentials-error'

export async function authenticateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUserUseCase = makeAuthenticateUserUseCase()

    await authenticateUserUseCase.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
