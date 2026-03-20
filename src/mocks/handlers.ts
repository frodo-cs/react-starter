import { sleep } from '@/lib/utils'
import { http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'
import { ENDPOINTS } from '@/constants/endpoints'

const registeredUsers = [
  {
    name: 'Admin',
    username: 'admin',
    password: 'password',
  },
  {
    name: 'Test',
    username: 'test',
    password: 'password',
  },
]

export const handlers = [
  // ─── Sign In ─────────────────────────────────────────────────────────────────
  http.post(`/${ENDPOINTS.LOGIN}`, async ({ request }) => {
    const body = (await request.json()) as any

    await sleep(1000)

    const registeredUser = registeredUsers.find(
      (u) => u.username === body.identifier && u.password === body.password
    )

    if (registeredUser) {
      return HttpResponse.json(
        {
          verified: true,
          accessToken: faker.string.alphanumeric(32),
          user: {
            id: faker.string.uuid(),
            name: registeredUser.name,
            username: registeredUser.username,
          },
        },
        { status: 200 }
      )
    }

    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    )
  }),

  // ─── Registration ─────────────────────────────────────────────────────────────
  http.post(`/${ENDPOINTS.REGISTER}`, async ({ request }) => {
    const body = (await request.json()) as any

    await sleep(1000)

    const existingUser = registeredUsers.find(
      (u) => u.username === body.identifier
    )
    if (existingUser) {
      return HttpResponse.json('Username already in use', { status: 409 })
    }

    const newUser = {
      name: body.name,
      username: body.identifier,
      password: body.password,
    }

    registeredUsers.push(newUser)

    return HttpResponse.json(
      {
        accessToken: faker.string.alphanumeric(32),
        user: {
          id: faker.string.uuid(),
          name: newUser.name,
          username: newUser.username,
        },
      },
      { status: 201 }
    )
  }),

  // ─── Forgot Password ─────────────────────────────────────────────────────────
  http.post(`/${ENDPOINTS.FORGOT_PASSWORD}`, async ({ request }) => {
    const body = (await request.json()) as any

    await sleep(1000)

    const userExists = registeredUsers.some(
      (u) => u.username === body.identifier
    )

    if (userExists) {
      console.info(`[MSW] Password reset link sent to ${body.identifier}`)
    }

    return HttpResponse.json(
      { message: 'If that identifier exists, a reset link has been sent.' },
      { status: 200 }
    )
  }),
]
