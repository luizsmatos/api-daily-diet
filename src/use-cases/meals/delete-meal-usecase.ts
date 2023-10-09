import { MealsRepository } from '@/repositories/meals/meals-repository'

import { MealNotFoundError } from './errors/meal-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteMealUseCaseRequest {
  userId: string
  mealId: string
}

export class DeleteMealUseCase {
  constructor(private readonly mealsRepository: MealsRepository) {}

  async execute({ userId, mealId }: DeleteMealUseCaseRequest): Promise<void> {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new MealNotFoundError()
    }

    if (meal.user_id !== userId) {
      throw new NotAllowedError()
    }

    await this.mealsRepository.delete(meal.id)
  }
}
