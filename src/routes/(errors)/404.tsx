import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/(errors)/404')({
  component: lazyRouteComponent(() =>
    import('@/features/errors/not-found-error').then((m) => ({
      default: m.NotFoundError,
    }))
  ),
})
