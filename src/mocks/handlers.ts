import { sleep } from '@/lib/utils'
import { http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'
import { ENDPOINTS } from '@/constants/endpoints'

faker.seed(67890)

const clients: { name: string; email: string }[] = [
  { name: 'Alice Client', email: 'alice@mail.com' },
  { name: 'Bob Client', email: 'bob@mail.com' },
]

const registeredUsers: {
  name: string
  email: string
  password: string
  verified: boolean
}[] = [
  {
    name: 'Admin',
    email: 'admin@mail.com',
    password: 'password',
    verified: true,
  },
  {
    name: 'Test',
    email: 'test@mail.com',
    password: 'password',
    verified: false,
  },
]

export const handlers = [
  // ─── Sign In ─────────────────────────────────────────────────────────────────
  http.post(`/${ENDPOINTS.LOGIN}`, async ({ request }) => {
    const body = (await request.json()) as any

    await sleep(1000)

    const registeredUser = registeredUsers.find(
      (u) => u.email === body.identifier && u.password === body.password
    )

    if (registeredUser) {
      if (
        import.meta.env.VITE_ACCOUNT_VERIFY === 'true' &&
        !registeredUser.verified
      ) {
        return HttpResponse.json({ verified: false }, { status: 200 })
      }

      return HttpResponse.json(
        {
          verified: true,
          accessToken: faker.string.alphanumeric(32),
          user: {
            username: registeredUser.name,
            email: registeredUser.email,
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

  // ─── Email Gate ───────────────────────────────────────────────────────────────
  http.post(`/${ENDPOINTS.EMAIL_GATE}`, async ({ request }) => {
    const body = (await request.json()) as any

    await sleep(800)

    const existingClient = clients.find((c) => c.email === body.email)

    if (existingClient) {
      return HttpResponse.json(
        {
          user: {
            id: faker.string.uuid(),
            name: existingClient.name,
            email: existingClient.email,
          },
        },
        { status: 200 }
      )
    }

    return HttpResponse.json({ user: null }, { status: 200 })
  }),

  // ─── Registration ─────────────────────────────────────────────────────────────
  http.post(`/${ENDPOINTS.REGISTER}`, async ({ request }) => {
    const body = (await request.json()) as any

    await sleep(1000)

    const existingUser = registeredUsers.find((u) => u.email === body.email)
    if (existingUser) {
      return HttpResponse.json('Email already in use', { status: 409 })
    }

    if (import.meta.env.VITE_EMAIL_GATE === 'true') {
      const isAuthorized = clients.some((c) => c.email === body.email)
      if (!isAuthorized) {
        return HttpResponse.json('Email not authorized by gate', {
          status: 403,
        })
      }
    }

    registeredUsers.push({
      name: body.name,
      email: body.email,
      password: body.password,
      verified: import.meta.env.VITE_ACCOUNT_VERIFY !== 'true',
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

  // ─── Forgot Password ─────────────────────────────────────────────────────────
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

  // ─── Account Verification ────────────────────────────────────────────────────
  http.post(`/${ENDPOINTS.VERIFY}`, async ({ request }) => {
    const body = (await request.json()) as any
    await sleep(800)

    const user = registeredUsers.find((u) => u.email === body.email)

    if (!user) {
      return HttpResponse.json({ verified: false }, { status: 200 })
    }

    if (body.code === '123456') {
      user.verified = true
      return HttpResponse.json({ verified: true }, { status: 200 })
    }

    return HttpResponse.json({ verified: false }, { status: 200 })
  }),

  // ─── Resend Verification Code ────────────────────────────────────────────────
  http.post(`/${ENDPOINTS.RESEND_CODE}`, async ({ request }) => {
    const body = (await request.json()) as any
    await sleep(800)

    const user = registeredUsers.find((u) => u.email === body.email)

    if (user) {
      console.info(`[MSW] Verification code resent to ${body.email}`)
    }

    return HttpResponse.json({ message: 'Code resent' }, { status: 200 })
  }),
]
