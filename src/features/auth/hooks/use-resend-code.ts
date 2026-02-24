import { useMutation } from '@tanstack/react-query'
import { resendCode } from '../api/resend-code'
import type { EmailPayload } from '../interfaces/api'

export const useResendCode = () => {
  return useMutation({
    mutationFn: (payload: EmailPayload) => resendCode(payload),
  })
}
