import { authAdapter } from '@/lib/api/config'
import type { VerifyPayload } from '../interfaces/api'
import type { VerifyResponse } from '../adapters/auth-base.adapter'

export const verify = async (
  payload: VerifyPayload
): Promise<VerifyResponse> => {
  return authAdapter.verify(payload)
}
