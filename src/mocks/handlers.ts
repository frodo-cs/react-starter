import { sleep } from '@/lib/utils'
import { http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'
import { ENDPOINTS } from '@/constants/endpoints'

faker.seed(67890)

const registeredUsers: { name: string; email: string; password: string }[] = [
  {
    name: 'Admin',
    email: 'admin@mail.com',
    password: 'password',
  },
  {
    name: 'Test',
    email: 'test@mail.com',
    password: 'password',
  },
]

export const handlers = [
  // AUTH
  http.post(`/${ENDPOINTS.LOGIN}`, async ({ request }) => {
    const body = (await request.json()) as any

    await sleep(1000)

    const registeredUser = registeredUsers.find(
      (u) => u.email === body.identifier && u.password === body.password
    )

    if (registeredUser) {
      return HttpResponse.json(
        {
          accessToken: faker.string.alphanumeric(32),
          user: {
            username: registeredUser.name,
            email: registeredUser.email,
          },
        },
        { status: 200 }
      )
    }

    return HttpResponse.json('Invalid credentials', { status: 401 })
  }),

  http.post(`/${ENDPOINTS.REGISTER}`, async ({ request }) => {
    const body = (await request.json()) as any

    await sleep(1000)

    const existingUser = registeredUsers.find((u) => u.email === body.email)
    if (existingUser) {
      return HttpResponse.json('Email already in use', { status: 409 })
    }

    registeredUsers.push({
      name: body.name,
      email: body.email,
      password: body.password,
    })

    return HttpResponse.json(
      {
        accessToken: faker.string.alphanumeric(32),
        user: {
          username: body.name,
          email: body.email,
        },
      },
      { status: 201 }
    )
  }),

  http.post(`/${ENDPOINTS.FORGOT_PASSWORD}`, async ({ request }) => {
    const body = (await request.json()) as any

    await sleep(1000)

    const userExists = registeredUsers.some((u) => u.email === body.email)

    if (userExists) {
      console.info(`[MSW] Password reset link sent to ${body.email}`)
    }

    return HttpResponse.json(
      { message: 'If that email exists, a reset link has been sent.' },
      { status: 200 }
    )
  }),
]
