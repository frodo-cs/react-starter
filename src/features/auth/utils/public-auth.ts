import { ENDPOINTS } from '@/constants/endpoints'

const PUBLIC_AUTH_ENDPOINTS = [
  ENDPOINTS.LOGIN,
  ENDPOINTS.REGISTER,
  ENDPOINTS.FORGOT_PASSWORD,
] as const

export function isPublicAuthEndpoint(url?: string): boolean {
  if (!url) return false
  return PUBLIC_AUTH_ENDPOINTS.some((endpoint) => url.includes(`/${endpoint}`))
}
