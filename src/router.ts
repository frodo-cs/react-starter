import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'
import { queryClient } from './query-client'
import { setRouterInstance } from '@/lib/router-instance'
import type { AuthState } from './stores/auth-store.ts'

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined as AuthState | undefined,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 10_000,
})

setRouterInstance(router)

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
