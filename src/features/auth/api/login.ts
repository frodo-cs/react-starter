import type { Credentials, LoginResponse } from '../interfaces/api'

export const login = async (
  credentials: Credentials
): Promise<LoginResponse> => {
  const response: LoginResponse = {
    token: 'auth-token',
    user: {
      username: 'user',
      email: credentials.email,
    },
  }

  return Promise.resolve(response)
}
