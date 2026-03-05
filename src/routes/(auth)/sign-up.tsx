import { z } from 'zod'
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

const searchSchema = z.object({
  email: z.email().optional().catch(undefined),
  zoho: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/(auth)/sign-up')({
  component: lazyRouteComponent(() =>
    import('@/features/auth/pages/sign-up').then((m) => ({ default: m.SignUp }))
  ),
  validateSearch: searchSchema,
})
