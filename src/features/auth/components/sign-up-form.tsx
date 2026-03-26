import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { z } from 'zod'

import { InputField } from '@/components/shared/input-field'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { getErrorMessage } from '@/lib/error-message'
import { submitWithToast } from '@/lib/toast-promise'

import { useRegister } from '../hooks/use-register'
import { signUpSchema } from '../schemas/auth'

type FormData = z.infer<typeof signUpSchema>

/**
 * Form component for user registration.
 *
 * Handles account creation and maintains session state upon success.
 */
export function SignUpForm() {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useRegister()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  })

  async function onSubmit(data: FormData) {
    const result = await submitWithToast(mutateAsync(data), {
      loading: t('signUp.toast.loading'),
      success: t('signUp.toast.success'),
      error: (error) => t('signUp.toast.error', { error: getErrorMessage(error) }),
    })

    if (!result) return

    navigate({ to: ROUTES.SIGN_IN })
  }

  return (
    <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        <InputField
          id='name'
          label={t('signUp.fields.name.label')}
          type='text'
          placeholder={t('signUp.fields.name.placeholder')}
          autoComplete='name'
          error={errors.name}
          {...register('name')}
        />

        <InputField
          id='identifier'
          label={t('signUp.fields.identifier.label')}
          type='text'
          placeholder={t('signUp.fields.identifier.placeholder')}
          autoComplete='username'
          error={errors.identifier}
          {...register('identifier')}
        />

        <InputField
          id='password'
          label={t('signUp.fields.password.label')}
          type={showPassword ? 'text' : 'password'}
          placeholder={t('signUp.fields.password.placeholder')}
          autoComplete='new-password'
          error={errors.password}
          {...register('password')}
          suffix={
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='text-muted-foreground transition-colors hover:text-foreground'
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />

        <InputField
          id='confirmPassword'
          label={t('signUp.fields.confirmPassword.label')}
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder={t('signUp.fields.confirmPassword.placeholder')}
          autoComplete='new-password'
          error={errors.confirmPassword}
          {...register('confirmPassword')}
          suffix={
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='text-muted-foreground transition-colors hover:text-foreground'
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />
      </div>

      <Button type='submit' className='h-11 w-full font-bold' disabled={isPending}>
        {isPending ? t('signUp.submitting') : t('signUp.submit')}
      </Button>
    </form>
  )
}
