import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/email-gate')({
  component: lazyRouteComponent(() =>
    import('@/features/auth/pages/email-gate').then((m) => ({
      default: m.EmailGate,
    }))
  ),
})
