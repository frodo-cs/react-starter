import { type QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { NavigationProgress } from '@/components/navigation-progress'
import { Toaster } from '@/components/ui/sonner'
import type { AuthStoreData } from '@/features/auth/interfaces/store'
import { ErrorBoundaryContent } from '@/features/errors/components/error-boundary-content'
import { GeneralError } from '@/features/errors/general-error'
import { NotFoundError } from '@/features/errors/not-found-error'

function RootComponent() {
  return (
    <ErrorBoundaryContent>
      <NavigationProgress />
      <Outlet />
      <Toaster duration={5000} />
      {!import.meta.env.PROD && (
        <>
          <ReactQueryDevtools buttonPosition='bottom-left' />
          <TanStackRouterDevtools position='bottom-right' />
        </>
      )}
    </ErrorBoundaryContent>
  )
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  auth: AuthStoreData | undefined
}>()({
  component: RootComponent,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})
