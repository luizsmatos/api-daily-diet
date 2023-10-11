import request from 'supertest'
import { beforeEach, afterEach, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'
import { app } from '@/app'

describe('Create Meal User Controller (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to create a meal', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'HVHbVx',
        description: 'GgWNMpEIvJ',
        date: new Date(),
        isInDiet: true,
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body.meal).toEqual(
      expect.objectContaining({ id: expect.any(String) }),
    )
  })
})
