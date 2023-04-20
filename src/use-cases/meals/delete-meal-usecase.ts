import { MealsRepository } from '@/repositories/meals/meals-repository'

import { MealNotFoundError } from './errors/meal-not-found-error'

interface DeleteMealUseCaseRequest {
  mealId: string
}

export class DeleteMealUseCase {
  constructor(private readonly mealsRepository: MealsRepository) {}

  async execute({ mealId }: DeleteMealUseCaseRequest): Promise<void> {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new MealNotFoundError()
    }

    await this.mealsRepository.delete(meal.id)
  }
}
