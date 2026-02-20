import type { z } from 'zod'
import type {
  signInSchema,
  signUpSchema,
  forgotPasswordSchema,
} from '../schemas/auth'
import type { AuthUser } from './auth'

export type Credentials = z.infer<typeof signInSchema>
export type SignUpPayload = z.infer<typeof signUpSchema>
export type ForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>

export interface LoginResponse {
  token: string
  user: AuthUser
}
