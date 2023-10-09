import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryMealsRepository } from '@/repositories/meals/in-memory/in-memory-meals-repository'

import { ListMealsUseCase } from './list-meals-usecase'
import { makeMeal } from 'test/factories/make-meal'

let mealsRepository: InMemoryMealsRepository
let sut: ListMealsUseCase

describe('List Meals UseCase', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new ListMealsUseCase(mealsRepository)
  })

  it('should be able to list a meals', async () => {
    mealsRepository.items.push(
      makeMeal({ user_id: 'user-1' }),
      makeMeal({ user_id: 'user-1' }),
      makeMeal({ user_id: 'user-1' }),
    )

    const { meals } = await sut.execute({
      userId: 'user-1',
    })

    expect(meals).toHaveLength(3)
  })
})
