import { useMutation } from '@tanstack/react-query'

import { register } from '../api/register'
import type { SignUpPayload } from '../interfaces/api'

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: SignUpPayload) => register(payload),
  })
}
