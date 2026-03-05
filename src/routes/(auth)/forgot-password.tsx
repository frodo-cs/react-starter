import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/forgot-password')({
  component: lazyRouteComponent(() =>
    import('@/features/auth/pages/forgot-password').then((m) => ({
      default: m.ForgotPassword,
    }))
  ),
})
