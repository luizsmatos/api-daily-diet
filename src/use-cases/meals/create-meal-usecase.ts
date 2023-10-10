import { MealsRepository } from '@/repositories/meals/meals-repository'
import { Meal } from '@prisma/client'

interface CreateMealUseCaseRequest {
  userId: string
  name: string
  description: string
  date: string
  isInDiet: boolean
}

interface CreateMealUseCaseResponse {
  meal: Meal
}

export class CreateMealUseCase {
  constructor(private readonly mealsRepository: MealsRepository) {}

  async execute({
    userId,
    name,
    description,
    date,
    isInDiet,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const meal = await this.mealsRepository.create({
      user_id: userId,
      name,
      description,
      date,
      is_in_diet: isInDiet,
    })

    return {
      meal,
    }
  }
}
