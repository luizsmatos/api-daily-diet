import { Meal } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export function makeMeal(override: Partial<Meal> = {}): Meal {
  const meal: Meal = {
    id: randomUUID(),
    user_id: randomUUID(),
    name: 'JavaScript Meal',
    description: 'A simple JavaScript meal',
    date: '2020-01-01',
    time: '12:00',
    is_in_diet: true,
    created_at: new Date(),
    ...override,
  }

  return meal
}
