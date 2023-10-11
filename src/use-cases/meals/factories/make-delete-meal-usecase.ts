import { PrismaMealsRepository } from '@/repositories/meals/prisma/prisma-meals-repository'

import { DeleteMealUseCase } from '../delete-meal-usecase'

export function makeDeleteMealUserUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new DeleteMealUseCase(mealsRepository)

  return useCase
}
