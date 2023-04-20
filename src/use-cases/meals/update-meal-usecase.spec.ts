import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryMealsRepository } from '@/repositories/meals/in-memory/in-memory-meals-repository'

import { UpdateMealUseCase } from './update-meal-usecase'

let mealsRepository: InMemoryMealsRepository
let sut: UpdateMealUseCase

describe('Update Meal UseCase', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new UpdateMealUseCase(mealsRepository)
  })

  it('should be able to update a meal', async () => {
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
})
