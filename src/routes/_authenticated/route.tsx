import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { ROUTES } from '@/constant/routes'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    const { accessToken } = context.auth.getState()

    if (!accessToken) {
      throw redirect({
        to: ROUTES.SIGN_IN,
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthenticatedLayout,
})
