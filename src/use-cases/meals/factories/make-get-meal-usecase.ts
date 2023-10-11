import { PrismaMealsRepository } from '@/repositories/meals/prisma/prisma-meals-repository'

import { GetMealUseCase } from '../get-meal-usecase'

export function makeGetMealUserUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new GetMealUseCase(mealsRepository)

  return useCase
}
