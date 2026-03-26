import type { AnyRouter } from '@tanstack/react-router'

/**
 * Singleton Router Instance Registry.
 *
 * In React, the router is usually accessed via hooks (e.g., `useRouter`).
 * However, we need to perform navigation from *outside* React components
 * (like in Axios interceptors or the global React Query error handler).
 * This registry holds a reference to the initialized router for exactly those cases.
 */
let routerInstance: AnyRouter | null = null

export function setRouterInstance(router: AnyRouter) {
  if (routerInstance) {
    return
  }
  routerInstance = router
}

export function getRouterInstance(): AnyRouter | null {
  return routerInstance
}

export function requireRouterInstance(): AnyRouter {
  if (!routerInstance) {
    throw new Error('Router instance not set. Ensure router is initialized before use.')
  }
  return routerInstance
}

export function _resetRouterInstance() {
  routerInstance = null
}
