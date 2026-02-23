import { authAdapter } from '@/lib/api/config'
import type { ForgotPasswordPayload } from '../interfaces/api'

export const forgotPassword = async (
  payload: ForgotPasswordPayload
): Promise<void> => {
  return authAdapter.forgotPassword(payload)
}
