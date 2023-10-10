import { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  findManyByUserId(id: string): Promise<Meal[]>
  findById(mealId: string): Promise<Meal | null>
  create(data: Prisma.MealUncheckedCreateInput): Promise<void>
  save(data: Meal): Promise<void>
  delete(mealId: string): Promise<void>
}
