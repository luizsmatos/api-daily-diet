import request from 'supertest'
import { hash } from 'bcrypt'
import { FastifyInstance } from 'fastify/types/instance'

import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await prisma.user.create({
    data: {
      name: 'Edgar Washington',
      email: 'nedzesa@sip.cr',
      password_hash: await hash('123456', 6),
    },
  })

  await request(app.server).post('/users').send({
    name: 'Edgar Washington',
    email: 'nedzesa@sip.cr',
    password: '123456',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'nedzesa@sip.cr',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
