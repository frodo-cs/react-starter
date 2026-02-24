import { useMutation } from '@tanstack/react-query'
import type { EmailPayload } from '../interfaces/api'
import { emailGate } from '../api/email-gate'

export const useEmailGate = () => {
  return useMutation({
    mutationFn: (payload: EmailPayload) => emailGate(payload),
  })
}
