import { z } from 'zod'
import i18n from '@/config/i18n'

export const signUpSchema = z
  .object({
    name: z.string().min(2, i18n.t('auth:validation.nameMin')),
    email: z.email(i18n.t('auth:validation.emailInvalid')),
    password: z.string().min(8, i18n.t('auth:validation.passwordMin')),
    confirmPassword: z
      .string()
      .min(1, i18n.t('auth:validation.confirmPasswordRequired')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: i18n.t('auth:validation.passwordsMatch'),
    path: ['confirmPassword'],
  })

export const signInSchema = z.object({
  email: z.email(i18n.t('auth:validation.emailInvalid')),
  password: z.string().min(1, i18n.t('auth:validation.passwordRequired')),
})

export const forgotPasswordSchema = z.object({
  email: z.email(i18n.t('auth:validation.emailInvalid')),
})
