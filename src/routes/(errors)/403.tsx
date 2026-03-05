import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/(errors)/403')({
  component: lazyRouteComponent(() =>
    import('@/features/errors/forbidden-error').then((m) => ({
      default: m.ForbiddenError,
    }))
  ),
})
