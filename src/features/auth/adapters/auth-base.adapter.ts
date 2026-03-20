import type {
  Credentials,
  SignUpPayload,
  IdentifierPayload,
} from '@/features/auth/interfaces/api'
import type { AuthUser } from '@/features/auth/interfaces/auth'

export interface LoginResponse {
  verified?: boolean
  token?: string
  user?: AuthUser
}

/**
 * Standardized error tokens for authentication flows.
 * Adapters should throw errors with these messages to ensure
 * the API layer remains implementation-agnostic.
 */
export const AUTH_ERRORS = {
  USER_NOT_FOUND: 'userNotFound',
  INVALID_CODE: 'invalidCode',
  EMAIL_ALREADY_IN_USE: 'emailAlreadyInUse',
} as const

/**
 * Base contract for Authentication Adapters.
 *
 * Implement this interface when connecting to a new backend (e.g., Firebase,
 * Custom REST, GraphQL). The application core relies on this contract,
 * keeping it entirely decoupled from the actual implementation details.
 */
export interface IAuthAdapter {
  /**
   * Authenticates a user and returns their profile and access token.
   */
  login(credentials: Credentials): Promise<LoginResponse>

  /**
   * Registers a new user.
   */
  register(payload: SignUpPayload): Promise<void>

  /**
   * Sends a password reset email to the provided address.
   */
  forgotPassword(payload: IdentifierPayload): Promise<void>
}
