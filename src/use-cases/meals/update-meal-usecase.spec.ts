import { beforeEach, describe, expect, it } from 'vitest'
import { makeMeal } from 'test/factories/make-meal'

import { InMemoryMealsRepository } from '@/repositories/meals/in-memory/in-memory-meals-repository'

import { UpdateMealUseCase } from './update-meal-usecase'
import { MealNotFoundError } from './errors/meal-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

let mealsRepository: InMemoryMealsRepository
let sut: UpdateMealUseCase

describe('Update Meal UseCase', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new UpdateMealUseCase(mealsRepository)
  })

  it('should be able to update a meal', async () => {
    const newMeal = makeMeal()

    mealsRepository.items.push(newMeal)

    const { meal } = await sut.execute({
      userId: newMeal.user_id,
      mealId: newMeal.id,
      data: {
        name: 'TypeScript Meal',
        description: 'A simple JavaScript meal',
        date: '2020-01-01',
        time: '12:00',
        isInDiet: true,
      },
    })

    expect(meal.name).toEqual('TypeScript Meal')
    expect(mealsRepository.items[0].name).toEqual('TypeScript Meal')
  })

  it('should not be able to update a meal from another user', async () => {
    const newMeal = makeMeal()

    mealsRepository.items.push(newMeal)

    await expect(
      sut.execute({
        userId: 'another-user',
        mealId: newMeal.id,
        data: {
          name: 'TypeScript Meal',
          description: 'A simple JavaScript meal',
          date: '2020-01-01',
          time: '12:00',
          isInDiet: true,
        },
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })

  it("should not be able to update a meal if it doesn't exist", async () => {
    await expect(
      sut.execute({
        userId: 'user-01',
        mealId: 'meal-not-exists',
        data: {
          name: 'TypeScript Meal',
          description: 'A simple JavaScript meal',
          date: '2020-01-01',
          time: '12:00',
          isInDiet: true,
        },
      }),
    ).rejects.toBeInstanceOf(MealNotFoundError)
  })
})
