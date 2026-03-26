import { createFileRoute, lazyRouteComponent, redirect } from '@tanstack/react-router'
import { z } from 'zod'

import { ROUTES } from '@/constants/routes'

const searchSchema = z.object({
  redirect: z.string().startsWith('/').optional(),
})

export const Route = createFileRoute('/(auth)/sign-in')({
  beforeLoad: ({ context, search }) => {
    if (context.auth?.accessToken) {
      throw redirect({ to: search.redirect || ROUTES.HOME })
    }
  },
  component: lazyRouteComponent(() =>
    import('@/features/auth/pages/sign-in').then((m) => ({ default: m.SignIn }))
  ),
  validateSearch: searchSchema,
})
