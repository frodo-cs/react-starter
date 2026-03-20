import type { z } from 'zod'
import type {
  signInSchema,
  signUpSchema,
  resetPasswordSchema,
  identifierSchema,
} from '../schemas/auth'

export type Credentials = z.infer<typeof signInSchema>
export type SignUpPayload = z.infer<typeof signUpSchema>
export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>
export type IdentifierPayload = z.infer<typeof identifierSchema>

export type { LoginResponse } from '../adapters/auth-base.adapter'
