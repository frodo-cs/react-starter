import { authAdapter } from '@/lib/api/config'

import type { IdentifierPayload } from '../interfaces/api'

export const forgotPassword = async (payload: IdentifierPayload): Promise<void> => {
  return authAdapter.forgotPassword(payload)
}
