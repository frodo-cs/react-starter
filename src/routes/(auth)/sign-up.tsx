import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { z } from 'zod'

const searchSchema = z.object({
  email: z.email().optional().catch(undefined),
  ref: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/(auth)/sign-up')({
  component: lazyRouteComponent(() =>
    import('@/features/auth/pages/sign-up').then((m) => ({ default: m.SignUp }))
  ),
  validateSearch: searchSchema,
})
