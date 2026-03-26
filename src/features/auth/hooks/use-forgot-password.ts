import { useMutation } from '@tanstack/react-query'

import { forgotPassword } from '../api/forgot-password'
import type { IdentifierPayload } from '../interfaces/api'

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: IdentifierPayload) => forgotPassword(payload),
  })
}
