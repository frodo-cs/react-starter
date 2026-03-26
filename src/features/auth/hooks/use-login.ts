import { useMutation } from '@tanstack/react-query'

import { login } from '../api/login'
import type { Credentials } from '../interfaces/api'
import { useAuthStore } from '../store/auth-store'

export const useLogin = () => {
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: (credentials: Credentials) => login(credentials),
    onSuccess: (response) => {
      if (response.user && response.token) {
        setAuth(response.user, response.token)
      }
    },
  })
}
