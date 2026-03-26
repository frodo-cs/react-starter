import { AUTH_ERRORS } from '@/features/auth/constants/auth'

/**
 * Lightweight utility to structurally validate and check the expiration of a JSON Web Token.
 * Note: This only decodes the payload to check the `exp` claim; it does NOT cryptographically verify the signature.
 *
 * @param token - The JWT string to verify.
 * @throws An error if the token is malformed or if it has expired.
 */
export const verifyToken = (token: string) => {
  const parts = token.split('.')
  if (parts.length !== 3) throw new Error(AUTH_ERRORS.INVALID_TOKEN)
  const { exp } = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
  if (exp * 1000 < Date.now()) throw new Error(AUTH_ERRORS.SESSION_EXPIRED_ERROR)
}
