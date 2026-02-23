import type {
  Credentials,
  SignUpPayload,
  ForgotPasswordPayload,
} from '@/features/auth/interfaces/api'
import type { AuthUser } from '@/features/auth/interfaces/auth'

export interface LoginResponse {
  token: string
  user: AuthUser
}

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
   * Registers a new user. The user will need to verify their email
   * before being able to authenticate.
   */
  register(payload: SignUpPayload): Promise<void>

  /**
   * Sends a password reset email to the provided address.
   */
  forgotPassword(payload: ForgotPasswordPayload): Promise<void>
}
