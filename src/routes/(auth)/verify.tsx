import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Verify } from '@/features/auth/pages/verify'

const searchSchema = z.object({
  email: z.email().catch(''),
})

export const Route = createFileRoute('/(auth)/verify')({
  component: Verify,
  validateSearch: searchSchema,
})
