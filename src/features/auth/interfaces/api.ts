import type { z } from 'zod'

import type {
  createIdentifierSchema,
  createSignInSchema,
  createSignUpSchema,
} from '../schemas/auth'

export type Credentials = z.infer<ReturnType<typeof createSignInSchema>>
export type SignUpPayload = z.infer<ReturnType<typeof createSignUpSchema>>
export type IdentifierPayload = z.infer<ReturnType<typeof createIdentifierSchema>>

export type { LoginResponse } from '../adapters/auth-base.adapter'
