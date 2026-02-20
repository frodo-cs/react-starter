import type { ForgotPasswordPayload } from '../interfaces/api'

export const forgotPassword = async (
  _payload: ForgotPasswordPayload
): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 1000))
}
