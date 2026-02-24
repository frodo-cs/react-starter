import { authAdapter } from '@/lib/api/config'
import type { EmailPayload } from '../interfaces/api'

export const forgotPassword = async (payload: EmailPayload): Promise<void> => {
  return authAdapter.forgotPassword(payload)
}
