import { PrismaMealsRepository } from '@/repositories/meals/prisma/prisma-meals-repository'

import { GetUserMetricsUseCase } from '../get-user-metrics-usecase'

export function makeGetUserMetricsUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new GetUserMetricsUseCase(mealsRepository)

  return useCase
}
