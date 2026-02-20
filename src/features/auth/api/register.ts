import type { SignUpPayload } from '../interfaces/api'

export const register = async (_payload: SignUpPayload): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 1000))
}
