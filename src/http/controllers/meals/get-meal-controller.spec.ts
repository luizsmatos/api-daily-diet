import request from 'supertest'
import { beforeEach, afterEach, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'
import { makeMeal } from 'test/factories/make-meal'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Get Meal Controller (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to get a meal', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const meal = await prisma.meal.create({
      data: makeMeal({ user_id: user.id }),
    })

    const response = await request(app.server)
      .get(`/meals/${meal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.meal.id).toEqual(meal.id)
  })
})
