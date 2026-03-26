import { z } from 'zod'

import i18n from '@/configs/i18n'

const t = (key: string) => i18n.t(key)

function createPasswordSchema() {
  return z
    .string()
    .trim()
    .min(8, t('auth:validation.passwordMin'))
    .regex(/[a-z]/, t('auth:validation.passwordLowercase'))
    .regex(/[A-Z]/, t('auth:validation.passwordUppercase'))
    .regex(/[0-9]/, t('auth:validation.passwordNumber'))
    .regex(/[!@#$%^&*(),.?":{}|<>+=-]/, t('auth:validation.passwordSymbol'))
    .regex(/^\S(.*\S)?$/, t('auth:validation.passwordNoWhitespace'))
}

function createPasswordWithConfirmSchema() {
  return z
    .object({
      password: createPasswordSchema(),
      confirmPassword: z.string().min(1, t('auth:validation.confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('auth:validation.passwordsMatch'),
      path: ['confirmPassword'],
    })
}

export function createSignUpSchema() {
  return z
    .object({
      name: z.string().min(2, t('auth:validation.nameMin')),
      identifier: z.string().min(1, t('auth:validation.identifierRequired')).trim().toLowerCase(),
      language: z.string().optional(),
    })
    .and(createPasswordWithConfirmSchema())
}

export function createSignInSchema() {
  return z.object({
    identifier: z.string().min(1, t('auth:validation.identifierRequired')).toLowerCase().trim(),
    password: z.string().trim().min(1, t('auth:validation.passwordRequired')),
  })
}

export function createIdentifierSchema() {
  return z.object({
    identifier: z.string().min(1, t('auth:validation.identifierRequired')).trim().toLowerCase(),
  })
}

export function createNewPasswordSchema() {
  return createPasswordWithConfirmSchema()
}
