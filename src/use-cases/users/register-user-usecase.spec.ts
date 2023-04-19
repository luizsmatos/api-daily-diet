import { compare } from 'bcrypt'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/users/in-memory/in-memory-users-repository'

import { RegisterUserUseCase } from './register-user-usecase'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let useCase: RegisterUserUseCase

describe('Register User UseCase', async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    useCase = new RegisterUserUseCase(usersRepository)
  })

  it('should be able to register a new user', async () => {
    const { user } = await useCase.execute({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await useCase.execute({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john.doe@gmail.com'

    await useCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(
      useCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
