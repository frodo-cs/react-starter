import { authAdapter } from '@/api/config'
import type { Credentials, LoginResponse } from '../interfaces/api'

export const login = async (
  credentials: Credentials
): Promise<LoginResponse> => {
  return authAdapter.login(credentials)
}
