import { useMutation } from '@tanstack/react-query'
import { verify } from '../api/verify'
import type { VerifyPayload } from '../interfaces/api'

export const useVerification = () => {
  return useMutation({
    mutationFn: (payload: VerifyPayload) => verify(payload),
  })
}
