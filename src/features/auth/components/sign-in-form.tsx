import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useRouter, useSearch } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { InputField } from '@/components/shared/input-field'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ROUTES } from '@/constants/routes'
import { getErrorMessage } from '@/lib/error-message'
import { submitWithToast } from '@/lib/toast-promise'

import type { LoginResponse } from '../adapters/auth-base.adapter'
import { useLogin } from '../hooks/use-login'
import type { Credentials } from '../interfaces/api'
import { createSignInSchema } from '../schemas/auth'

export function SignInForm() {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const router = useRouter()
  const { redirect } = useSearch({ from: '/(auth)/sign-in' })
  const loginMutation = useLogin()
  const { mutateAsync, isPending } = loginMutation
  const [showPassword, setShowPassword] = useState(false)
  const signInSchema = createSignInSchema()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: zodResolver(signInSchema),
  })

  async function onSubmit(data: Credentials) {
    const loginResult = await submitWithToast(mutateAsync(data), {
      loading: t('signIn.toast.loading'),
      success: (response: LoginResponse) =>
        response.user
          ? t('signIn.toast.success', { identifier: response.user.name })
          : t('signIn.toast.loading'),
      error: (error) => t('signIn.toast.error', { error: getErrorMessage(error) }),
    })

    if (!loginResult) return

    await router.invalidate()
    navigate({ to: redirect ?? ROUTES.HOME, replace: true })
  }

  return (
    <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        <InputField
          id='identifier'
          label={t('signIn.fields.identifier.label')}
          type='text'
          placeholder={t('signIn.fields.identifier.placeholder')}
          autoComplete='username'
          error={errors.identifier}
          {...register('identifier')}
        />

        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='password'>{t('signIn.fields.password.label')}</Label>
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className='text-xs font-bold text-primary transition-all hover:underline'
            >
              {t('signIn.fields.password.forgotPassword')}
            </Link>
          </div>
          <InputField
            id='password'
            type={showPassword ? 'text' : 'password'}
            placeholder={t('signIn.fields.password.placeholder')}
            autoComplete='current-password'
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
        </div>
      </div>

      <Button type='submit' className='h-11 w-full font-bold' disabled={isPending}>
        {isPending ? t('signIn.submitting') : t('signIn.submit')}
      </Button>
    </form>
  )
}
