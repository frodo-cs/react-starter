import { z } from 'zod'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { SignIn } from '@/features/auth/pages/sign-in'
import { ROUTES } from '@/constants/routes'

const searchSchema = z.object({
  redirect: z.string().startsWith('/').optional(),
})

export const Route = createFileRoute('/(auth)/sign-in')({
  beforeLoad: ({ context, search }) => {
    const accessToken = context.auth?.accessToken

    if (accessToken) {
      throw redirect({
        to: search.redirect || ROUTES.HOME,
      })
    }
  },
  component: SignIn,
  validateSearch: searchSchema,
})
