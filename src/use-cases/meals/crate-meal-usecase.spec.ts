import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryMealsRepository } from '@/repositories/meals/in-memory/in-memory-meals-repository'

import { CreateMealUseCase } from './create-meal-usecase'

let mealsRepository: InMemoryMealsRepository
let sut: CreateMealUseCase

describe('Create Meal UseCase', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new CreateMealUseCase(mealsRepository)
  })

  it('should be able to create a new meal', async () => {
    const { meal } = await sut.execute({
      userId: 'user-01',
      name: 'JavaScript Meal',
      description: 'A simple JavaScript meal',
      date: '2020-01-01',
      time: '12:00',
      isInDiet: true,
    })

    expect(meal.id).toEqual(expect.any(String))
  })
})
