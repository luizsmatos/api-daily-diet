import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryMealsRepository } from '@/repositories/meals/in-memory/in-memory-meals-repository'

import { GetMealUseCase } from './get-meal-usecase'
import { MealNotFoundError } from './errors/meal-not-found-error'

let mealsRepository: InMemoryMealsRepository
let sut: GetMealUseCase

describe('Get Meal UseCase', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealUseCase(mealsRepository)
  })

  it('should be able to get a meal', async () => {
    const createdMeal = await mealsRepository.create({
      user_id: 'user-01',
      name: 'JavaScript Meal',
      description: 'A simple JavaScript meal',
      date: '2020-01-01',
      time: '12:00',
      is_in_diet: true,
    })

    const { meal } = await sut.execute({
      mealId: createdMeal.id,
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
