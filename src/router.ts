import { createRouter } from '@tanstack/react-router'

import { setRouterInstance } from '@/lib/router-instance'

import type { AuthStoreData } from './features/auth/interfaces/store.ts'
import { queryClient } from './query-client'
import { routeTree } from './routeTree.gen.ts'

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined as AuthStoreData | undefined,
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
