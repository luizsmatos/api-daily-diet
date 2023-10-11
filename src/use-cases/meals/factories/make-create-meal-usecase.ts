import { PrismaMealsRepository } from '@/repositories/meals/prisma/prisma-meals-repository'

import { CreateMealUseCase } from '../create-meal-usecase'

export function makeCreateMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new CreateMealUseCase(mealsRepository)

  return useCase
}
