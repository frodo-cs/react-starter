import type { z } from 'zod'

import type { identifierSchema, signInSchema, signUpSchema } from '../schemas/auth'

export type Credentials = z.infer<typeof signInSchema>
export type SignUpPayload = z.infer<typeof signUpSchema>
export type IdentifierPayload = z.infer<typeof identifierSchema>

export type { LoginResponse } from '../adapters/auth-base.adapter'
