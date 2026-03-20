import { ROUTES } from '@/constants/routes'

const PUBLIC_ENDPOINTS = [
  ROUTES.SIGN_IN,
  ROUTES.SIGN_UP,
  ROUTES.FORGOT_PASSWORD,
]

/**
 * Determines whether a given URL corresponds to a public authentication endpoint
 * that should not trigger session expiration checks or require a valid token.
 *
 * @param url - The URL string to verify.
 * @returns true if the URL is a public authentication endpoint, false otherwise.
 */
export function isPublicAuthEndpoint(url?: string): boolean {
  if (!url) return false
  return PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint))
}
