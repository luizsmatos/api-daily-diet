import { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  findManyByUserId(id: string): Promise<Meal[]>
  findById(mealId: string): Promise<Meal | null>
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  save(data: Meal): Promise<Meal>
  delete(mealId: string): Promise<void>
}
