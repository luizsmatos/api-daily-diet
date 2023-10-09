import { randomUUID } from 'node:crypto'
import { Prisma, Meal } from '@prisma/client'

import { MealsRepository } from '../meals-repository'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async findManyByUserId(id: string): Promise<Meal[]> {
    const meals = this.items.filter((item) => item.user_id === id)

    return meals
  }

  async findById(mealId: string): Promise<Meal | null> {
    const meal = this.items.find((item) => item.id === mealId)

    if (!meal) {
      return null
    }

    return meal
  }

  async create(data: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    const meal: Meal = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      date: data.date,
      time: data.time,
      is_in_diet: data.is_in_diet,
      user_id: data.user_id,
      created_at: new Date(),
    }

    this.items.push(meal)

    return meal
  }

  async save(meal: Meal): Promise<Meal> {
    const mealIndex = this.items.findIndex((item) => item.id === meal.id)

    if (mealIndex >= 0) {
      this.items[mealIndex] = meal
    }

    return meal
  }

  async delete(mealId: string): Promise<void> {
    const mealIndex = this.items.findIndex((item) => item.id === mealId)

    if (mealIndex >= 0) {
      this.items.splice(mealIndex, 1)
    }
  }
}
