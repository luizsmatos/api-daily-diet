import { PrismaMealsRepository } from '@/repositories/meals/prisma/prisma-meals-repository'

import { ListMealsUseCase } from '../list-meals-usecase'

export function makeListMealsUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new ListMealsUseCase(mealsRepository)

  return useCase
}
