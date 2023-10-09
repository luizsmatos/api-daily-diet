import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryMealsRepository } from '@/repositories/meals/in-memory/in-memory-meals-repository'

import { GetUserMetricsUseCase } from './get-user-metrics-usecase'
import { makeMeal } from 'test/factories/make-meal'

let mealsRepository: InMemoryMealsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Meals UseCase', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetUserMetricsUseCase(mealsRepository)
  })

  it('should be able to get user metrics', async () => {
    mealsRepository.items.push(
      makeMeal({ user_id: 'user-1' }),
      makeMeal({ user_id: 'user-1' }),
      makeMeal({ user_id: 'user-1' }),
      makeMeal({ user_id: 'user-1' }),
      makeMeal({ user_id: 'user-1', is_in_diet: false }),
      makeMeal({ user_id: 'user-1', is_in_diet: false }),
      makeMeal({ user_id: 'user-1' }),
    )

    const {
      totalMealsRecorded,
      totalMealsInDiet,
      totalMealsOutsideDiet,
      bestSequenceMealsInDiet,
    } = await sut.execute({
      userId: 'user-1',
    })

    expect(totalMealsRecorded).toEqual(7)
    expect(totalMealsInDiet).toEqual(5)
    expect(totalMealsOutsideDiet).toEqual(2)
    expect(bestSequenceMealsInDiet).toEqual(4)
  })
})
