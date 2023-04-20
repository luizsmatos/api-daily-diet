import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryMealsRepository } from '@/repositories/meals/in-memory/in-memory-meals-repository'

import { DeleteMealUseCase } from './delete-meal-usecase'
import { MealNotFoundError } from './errors/meal-not-found-error'

let mealsRepository: InMemoryMealsRepository
let sut: DeleteMealUseCase

describe('Delete Meal UseCase', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new DeleteMealUseCase(mealsRepository)
  })

  it('should be able to delete a meal', async () => {
    const createdMeal = await mealsRepository.create({
      user_id: 'user-01',
      name: 'JavaScript Meal',
      description: 'A simple JavaScript meal',
      date: '2020-01-01',
      time: '12:00',
      is_in_diet: true,
    })

    await sut.execute({ mealId: createdMeal.id })

    expect(mealsRepository.items).toHaveLength(0)
  })

  it("should not be able to delete a meal if it doesn't exist", async () => {
    await expect(
      sut.execute({
        mealId: 'meal-not-exists',
      }),
    ).rejects.toBeInstanceOf(MealNotFoundError)
  })
})
