import type { z } from 'zod'
import type {
  signInSchema,
  signUpSchema,
  emailSchema,
  verificationSchema,
} from '../schemas/auth'

export type Credentials = z.infer<typeof signInSchema>
export type SignUpPayload = z.infer<typeof signUpSchema>
export type EmailPayload = z.infer<typeof emailSchema>
export type VerifyPayload = { email: string } & z.infer<
  typeof verificationSchema
>

export type { LoginResponse } from '../adapters/auth-base.adapter'
