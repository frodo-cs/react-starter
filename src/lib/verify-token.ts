import { AUTH_ERRORS } from '@/features/auth/constants/auth'

export function assertTokenNotExpired(token: string) {
  const parts = token.split('.')
  if (parts.length !== 3) throw new Error(AUTH_ERRORS.INVALID_TOKEN)
  const { exp } = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
  if (exp * 1000 < Date.now()) throw new Error(AUTH_ERRORS.SESSION_EXPIRED_ERROR)
}
