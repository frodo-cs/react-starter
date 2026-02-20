import type { AnyRouter } from '@tanstack/react-router'

let routerInstance: AnyRouter | null = null

export function setRouterInstance(router: AnyRouter) {
  routerInstance = router
}

export function getRouterInstance(): AnyRouter | null {
  return routerInstance
}

export function requireRouterInstance(): AnyRouter {
  if (!routerInstance) {
    throw new Error(
      'Router instance not set. Ensure router is initialized before use.'
    )
  }
  return routerInstance
}
