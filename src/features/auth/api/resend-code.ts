import { authAdapter } from '@/lib/api/config'
import type { EmailPayload } from '../interfaces/api'

export const resendCode = async (payload: EmailPayload): Promise<void> => {
  return authAdapter.resendCode(payload)
}
