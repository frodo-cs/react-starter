import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth-store'
import { login } from '../api/login'
import type { Credentials } from '../interfaces/api'

/**
 * Hook for user login.
 *
 * Returns a mutation that handles credentials submission,
 * triggers a success toast with the username, and updates
 * the auth store on successful verification.
 */
export const useLogin = () => {
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: (credentials: Credentials) => login(credentials),
    onSuccess: (response) => {
      if (response.verified !== false && response.user && response.token) {
        setAuth(response.user, response.token)
      }
    },
  })
}
