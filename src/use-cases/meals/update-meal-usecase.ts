import { MealsRepository } from '@/repositories/meals/meals-repository'
import { Meal } from '@prisma/client'
import { MealNotFoundError } from './errors/meal-not-found-error'

interface UpdateMealUseCaseRequest {
  mealId: string
  data: {
    name: string
    description: string
    date: string
    time: string
    isInDiet: boolean
  }
}

interface UpdateMealUseCaseResponse {
  meal: Meal
}

export class UpdateMealUseCase {
  constructor(private readonly mealsRepository: MealsRepository) {}

  async execute({
    mealId,
    data,
  }: UpdateMealUseCaseRequest): Promise<UpdateMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new MealNotFoundError()
    }

    meal.name = data.name
    meal.description = data.description
    meal.date = data.date
    meal.time = data.time
    meal.is_in_diet = data.isInDiet

    await this.mealsRepository.save(meal)

    return {
      meal,
    }
  }
}
