import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '../api/forgot-password'
import type { ForgotPasswordPayload } from '../interfaces/api'

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
  })
}
