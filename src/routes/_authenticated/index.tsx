import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  component: lazyRouteComponent(() =>
    import('@/features/dashboard/layout').then((m) => ({
      default: m.Dashboard,
    }))
  ),
})
