import { randomUUID } from 'node:crypto'
import { Prisma, Meal } from '@prisma/client'

import { MealsRepository } from '../meals-repository'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

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
}
