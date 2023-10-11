import request from 'supertest'
import { beforeEach, afterEach, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'
import { makeMeal } from 'test/factories/make-meal'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Update Meal User Controller (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to update a meal', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    let meal = await prisma.meal.create({
      data: makeMeal({ user_id: user.id }),
    })

    const response = await request(app.server)
      .patch(`/meals/${meal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'HVHbVx',
        description: 'GgWNMpEIvJ',
        date: new Date(),
        isInDiet: true,
      })

    expect(response.statusCode).toEqual(204)

    meal = await prisma.meal.findUniqueOrThrow({
      where: {
        id: meal.id,
      },
    })

    expect(meal.name).toEqual('HVHbVx')
    expect(meal.description).toEqual('GgWNMpEIvJ')
  })
})
