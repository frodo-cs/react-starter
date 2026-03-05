import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/(errors)/500')({
  component: lazyRouteComponent(() =>
    import('@/features/errors/general-error').then((m) => ({
      default: m.GeneralError,
    }))
  ),
})
