import { authAdapter } from '@/lib/api/config'
import type { EmailPayload } from '../interfaces/api'
import type { EmailGateResponse } from '../adapters/auth-base.adapter'

export const emailGate = async (
  payload: EmailPayload
): Promise<EmailGateResponse> => {
  return authAdapter.emailGate(payload)
}
