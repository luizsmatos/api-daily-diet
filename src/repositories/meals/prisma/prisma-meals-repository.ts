import { Meal, Prisma } from '@prisma/client'
import { MealsRepository } from '../meals-repository'
import { prisma } from '@/lib/prisma'

export class PrismaMealsRepository implements MealsRepository {
  async findManyByUserId(id: string): Promise<Meal[]> {
    const meals = await prisma.meal.findMany({
      where: {
        user_id: id,
      },
    })

    return meals
  }

  async findById(mealId: string): Promise<Meal | null> {
    const meal = prisma.meal.findFirstOrThrow({
      where: {
        id: mealId,
      },
    })

    return meal
  }

  async create(data: Prisma.MealUncheckedCreateInput): Promise<void> {
    await prisma.meal.create({ data })
  }

  async save(data: Meal): Promise<void> {
    await prisma.meal.update({ where: { id: data.id }, data })
  }

  async delete(mealId: string): Promise<void> {
    await prisma.meal.delete({ where: { id: mealId } })
  }
}
