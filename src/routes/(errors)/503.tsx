import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/(errors)/503')({
  component: lazyRouteComponent(() =>
    import('@/features/errors/maintenance-error').then((m) => ({
      default: m.MaintenanceError,
    }))
  ),
})
