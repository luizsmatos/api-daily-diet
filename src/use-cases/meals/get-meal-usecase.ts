import { MealsRepository } from '@/repositories/meals/meals-repository'
import { Meal } from '@prisma/client'
import { MealNotFoundError } from './errors/meal-not-found-error'

interface GetMealUseCaseRequest {
  mealId: string
}

interface GetMealUseCaseResponse {
  meal: Meal
}

export class GetMealUseCase {
  constructor(private readonly mealsRepository: MealsRepository) {}

  async execute({
    mealId,
  }: GetMealUseCaseRequest): Promise<GetMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new MealNotFoundError()
    }

    return {
      meal,
    }
  }
}
