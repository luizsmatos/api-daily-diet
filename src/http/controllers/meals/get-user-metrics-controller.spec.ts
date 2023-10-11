import request from 'supertest'
import { beforeEach, afterEach, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { makeMeal } from 'test/factories/make-meal'

describe('Get User Metrics Controller (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to get user metrics', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    await prisma.meal.create({
      data: makeMeal({ user_id: user.id }),
    })

    await prisma.meal.create({
      data: makeMeal({ user_id: user.id }),
    })

    await prisma.meal.create({
      data: makeMeal({ user_id: user.id }),
    })

    await prisma.meal.create({
      data: makeMeal({ user_id: user.id, is_in_diet: false }),
    })

    await prisma.meal.create({
      data: makeMeal({ user_id: user.id, is_in_diet: false }),
    })

    await prisma.meal.create({
      data: makeMeal({ user_id: user.id }),
    })

    const response = await request(app.server)
      .get('/meals/summary')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.summary).toEqual({
      totalMealsRecorded: 6,
      totalMealsInDiet: 4,
      totalMealsOutsideDiet: 2,
      bestSequenceMealsInDiet: 3,
    })
  })
})
