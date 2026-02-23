import { authAdapter } from '@/lib/api/config'
import type { SignUpPayload } from '../interfaces/api'

export const register = async (payload: SignUpPayload): Promise<void> => {
  return authAdapter.register(payload)
}
