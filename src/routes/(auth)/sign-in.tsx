import { z } from 'zod'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { SignIn } from '@/features/auth/pages/sign-in'
import { ROUTES } from '@/constant/routes'

const searchSchema = z.object({
  redirect: z.string().optional(),
})

export const Route = createFileRoute('/(auth)/sign-in')({
  beforeLoad: ({ context, search }) => {
    const { accessToken } = context.auth.getState()

    if (accessToken) {
      throw redirect({
        to: search.redirect || ROUTES.HOME,
      })
    }
  },
  component: SignIn,
  validateSearch: searchSchema,
})
