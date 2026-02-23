import { sleep } from '@/lib/utils'
import { http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'
import { ENDPOINTS } from '@/constant/endpoints'

faker.seed(67890)

export const handlers = [
  // AUTH
  http.post(`/${ENDPOINTS.LOGIN}`, async ({ request }) => {
    const body = (await request.json()) as any

    await sleep(1000)

    if (body.identifier === 'admin@mail.com' && body.password === 'password') {
      return HttpResponse.json(
        {
          accessToken: 'mock-token-12345',
          user: {
            username: 'Admin',
            email: 'admin@mail.com',
          },
        },
        { status: 200 }
      )
    }

    return HttpResponse.json('Invalid credentials', { status: 401 })
  }),
]
