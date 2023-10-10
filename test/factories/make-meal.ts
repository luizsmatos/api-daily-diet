import { Meal } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export function makeMeal(override: Partial<Meal> = {}): Meal {
  const meal: Meal = {
    id: randomUUID(),
    user_id: randomUUID(),
    name: 'JavaScript Meal',
    description: 'A simple JavaScript meal',
    date: new Date(),
    is_in_diet: true,
    created_at: new Date(),
    ...override,
  }

  return meal
}
