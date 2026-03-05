import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/(errors)/401')({
  component: lazyRouteComponent(() =>
    import('@/features/errors/unauthorized-error').then((m) => ({
      default: m.UnauthorizedError,
    }))
  ),
})
