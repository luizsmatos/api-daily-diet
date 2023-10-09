import { MealsRepository } from '@/repositories/meals/meals-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  totalMealsRecorded: number
  totalMealsInDiet: number
  totalMealsOutsideDiet: number
  bestSequenceMealsInDiet: number
}

export class GetUserMetricsUseCase {
  constructor(private readonly mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const meals = await this.mealsRepository.findManyByUserId(userId)

    let currentSequence = 0
    const bestSequenceMealsInDiet = meals.reduce((bestSequence, item) => {
      if (item.is_in_diet) {
        currentSequence += 1
        bestSequence = Math.max(bestSequence, currentSequence)
      } else {
        currentSequence = 0
      }

      return bestSequence
    }, 0)

    return {
      totalMealsRecorded: meals.length,
      totalMealsInDiet: meals.filter((meal) => meal.is_in_diet).length,
      totalMealsOutsideDiet: meals.filter((meal) => !meal.is_in_diet).length,
      bestSequenceMealsInDiet,
    }
  }
}
