import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth-store'
import { login } from '../api/login'
import type { Credentials } from '../interfaces/api'

export const useLogin = () => {
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: (credentials: Credentials) => login(credentials),
    onSuccess: (response) => {
      setAuth(response.user, response.token)
    },
  })
}
