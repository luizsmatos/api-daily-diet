import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryMealsRepository } from '@/repositories/meals/in-memory/in-memory-meals-repository'

import { GetMealUseCase } from './get-meal-usecase'
import { MealNotFoundError } from './errors/meal-not-found-error'
import { makeMeal } from 'test/factories/make-meal'

let mealsRepository: InMemoryMealsRepository
let sut: GetMealUseCase

describe('Get Meal UseCase', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealUseCase(mealsRepository)
  })

  it('should be able to get a meal', async () => {
    const newMeal = makeMeal()

    mealsRepository.items.push(newMeal)

    const { meal } = await sut.execute({
      mealId: newMeal.id,
    })

    expect(meal.id).toEqual(expect.any(String))
    expect(meal.name).toEqual('JavaScript Meal')
  })

  it("should not be able to get a meal if it doesn't exist", async () => {
    await expect(
      sut.execute({
        mealId: 'meal-not-exists',
      }),
    ).rejects.toBeInstanceOf(MealNotFoundError)
  })
})
