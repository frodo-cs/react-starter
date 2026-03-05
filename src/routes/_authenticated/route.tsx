import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { ROUTES } from '@/constants/routes'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    const accessToken = context.auth?.accessToken

    if (!accessToken) {
      throw redirect({
        to: ROUTES.SIGN_IN,
        search: {
          redirect: location.href,
        },
      })
    }
  },
  loader: () => import('@/features/dashboard/layout'),
  component: AuthenticatedLayout,
})
