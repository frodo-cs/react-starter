import { z } from 'zod'
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

const searchSchema = z.object({
  email: z.email().catch(''),
})

export const Route = createFileRoute('/(auth)/verify')({
  component: lazyRouteComponent(() =>
    import('@/features/auth/pages/verify').then((m) => ({ default: m.Verify }))
  ),
  validateSearch: searchSchema,
})
