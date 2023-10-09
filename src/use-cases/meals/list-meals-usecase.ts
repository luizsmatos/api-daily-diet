import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals/meals-repository'

interface ListMealsUseCaseRequest {
  userId: string
}

interface ListMealsUseCaseResponse {
  meals: Meal[]
}

export class ListMealsUseCase {
  constructor(private readonly mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: ListMealsUseCaseRequest): Promise<ListMealsUseCaseResponse> {
    const meals = await this.mealsRepository.findManyByUserId(userId)

    return {
      meals,
    }
  }
}
