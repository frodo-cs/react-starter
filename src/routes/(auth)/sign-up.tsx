import { z } from 'zod'
import { SignUp } from '@/features/auth/pages/sign-up'
import { createFileRoute } from '@tanstack/react-router'

const searchSchema = z.object({
  email: z.string().email().optional().catch(undefined),
})

export const Route = createFileRoute('/(auth)/sign-up')({
  component: SignUp,
  validateSearch: searchSchema,
})
