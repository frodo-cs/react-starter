import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '../api/forgot-password'
import type { EmailPayload } from '../interfaces/api'

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: EmailPayload) => forgotPassword(payload),
  })
}
