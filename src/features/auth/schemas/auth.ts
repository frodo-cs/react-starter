import { z } from 'zod'
import i18n from '@/configs/i18n'

const passwordSchema = z
  .string()
  .trim()
  .min(8, i18n.t('auth:validation.passwordMin'))
  .regex(/[a-z]/, i18n.t('auth:validation.passwordLowercase'))
  .regex(/[A-Z]/, i18n.t('auth:validation.passwordUppercase'))
  .regex(/[0-9]/, i18n.t('auth:validation.passwordNumber'))
  .regex(/[!@#$%^&*(),.?":{}|<>+=-]/, i18n.t('auth:validation.passwordSymbol'))
  .regex(/^\S(.*\S)?$/, i18n.t('auth:validation.passwordNoWhitespace'))

const passwordWithConfirmSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, i18n.t('auth:validation.confirmPasswordRequired')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: i18n.t('auth:validation.passwordsMatch'),
    path: ['confirmPassword'],
  })

export const signUpSchema = z
  .object({
    name: z.string().min(2, i18n.t('auth:validation.nameMin')),
    identifier: z
      .string()
      .min(1, i18n.t('auth:validation.identifierRequired'))
      .trim()
      .toLowerCase(),
    language: z.string().optional(),
  })
  .and(passwordWithConfirmSchema)

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(1, i18n.t('auth:validation.identifierRequired'))
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .trim()
    .min(1, i18n.t('auth:validation.passwordRequired')),
})

export const identifierSchema = z.object({
  identifier: z
    .string()
    .min(1, i18n.t('auth:validation.identifierRequired'))
    .trim()
    .toLowerCase(),
})

export const resetPasswordSchema = z
  .object({
    code: z
      .string()
      .length(6, i18n.t('auth:validation.codeLength'))
      .regex(/^\d+$/, i18n.t('auth:validation.codeNumeric')),
  })
  .and(passwordWithConfirmSchema)

export const newPasswordSchema = passwordWithConfirmSchema
