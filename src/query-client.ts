import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import i18n from '@/configs/i18n'
import { useAuthStore } from '@/features/auth/store/auth-store'
import { getRouterInstance } from '@/lib/router-instance'

import { ENDPOINTS } from './constants/endpoints'
import { ROUTES } from './constants/routes'

/**
 * Global API Error Handler.
 *
 * Intercepts all failed queries and mutations across the application.
 * Automatically handles 401 (Unauthorized) by logging the user out and
 * redirecting to the sign-in page, and manages other generic HTTP errors
 * like 500 (Server Error) and 403 (Forbidden).
 */
const handleGlobalError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      const isLoginRequest = error.config?.url?.includes(`/${ENDPOINTS.LOGIN}`)
      if (!isLoginRequest) {
        const routerInstance = getRouterInstance()
        toast.error(i18n.t('error:toasts.session_expired'))
        performLogout()
        if (routerInstance) {
          const rawRedirect = routerInstance.history.location.href
          const redirect = rawRedirect?.startsWith('/') ? rawRedirect : undefined
          routerInstance.navigate({
            to: ROUTES.SIGN_IN,
            search: { redirect },
          })
        }
      }
    }
    if (error.response?.status === 500) {
      toast.error(i18n.t('error:toasts.internal_server_error'))
      if (import.meta.env.PROD) {
        const routerInstance = getRouterInstance()
        if (routerInstance) routerInstance.navigate({ to: ROUTES.SERVER_ERROR })
      }
    }
    if (error.response?.status === 403) {
      const routerInstance = getRouterInstance()
      if (routerInstance) routerInstance.navigate({ to: ROUTES.FORBIDDEN, replace: true })
    }
    if (error.response?.status === 304) {
      toast.error(i18n.t('error:toasts.content_not_modified'))
    }
  }
}

/**
 * Clears auth state and the query cache.
 * Use this for both explicit logout and 401-triggered logout.
 */
export function performLogout() {
  useAuthStore.getState().logout()
  queryClient.cancelQueries()
  queryClient.clear()
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof AxiosError) {
          const status = error.response?.status ?? 0
          if ([401, 403].includes(status)) return false
        }

        if (import.meta.env.DEV) return false
        return failureCount < 3
      },
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: 10 * 1000, // 10s
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      handleGlobalError(error)
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      handleGlobalError(error)
    },
  }),
})
