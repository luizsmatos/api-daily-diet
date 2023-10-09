import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryMealsRepository } from '@/repositories/meals/in-memory/in-memory-meals-repository'

import { makeMeal } from 'test/factories/make-meal'
import { DeleteMealUseCase } from './delete-meal-usecase'
import { MealNotFoundError } from './errors/meal-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

let mealsRepository: InMemoryMealsRepository
let sut: DeleteMealUseCase

describe('Delete Meal UseCase', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new DeleteMealUseCase(mealsRepository)
  })

  it('should be able to delete a meal', async () => {
    const newMeal = makeMeal()
    mealsRepository.items.push(newMeal)

    await sut.execute({ userId: newMeal.user_id, mealId: newMeal.id })

    expect(mealsRepository.items).toHaveLength(0)
  })

  it("should not be able to delete a meal if it doesn't exist", async () => {
    await expect(
      sut.execute({
        userId: 'user-1',
        mealId: 'meal-not-exists',
      }),
    ).rejects.toBeInstanceOf(MealNotFoundError)
  })

  it('should not be able to delete a meal from another user', async () => {
    const newMeal = makeMeal()
    mealsRepository.items.push(newMeal)

    await expect(
      sut.execute({
        userId: 'another-user',
        mealId: newMeal.id,
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })
})
