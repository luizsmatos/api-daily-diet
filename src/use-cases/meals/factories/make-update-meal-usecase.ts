import { PrismaMealsRepository } from '@/repositories/meals/prisma/prisma-meals-repository'

import { UpdateMealUseCase } from '../update-meal-usecase'

export function makeUpdateMealUserUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new UpdateMealUseCase(mealsRepository)

  return useCase
}
