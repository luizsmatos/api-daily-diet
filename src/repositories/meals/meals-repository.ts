import { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  findById(mealId: string): Promise<Meal | null>
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
}
