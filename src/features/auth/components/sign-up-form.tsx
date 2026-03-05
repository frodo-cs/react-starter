import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearch } from '@tanstack/react-router'
import type { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { signUpSchema } from '../schemas/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRegister } from '../hooks/use-register'
import { getErrorMessage } from '@/lib/error-message'
import { ROUTES } from '@/constants/routes'
import config from '@/configs/general'
import { submitWithToast } from '@/lib/toast-promise'

type FormData = z.infer<typeof signUpSchema>

/**
 * Form component for user registration.
 *
 * Handles account creation, prefilled email from the gate,
 * and conditional redirection based on verification settings.
 */
export function SignUpForm() {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const { email: prefilledEmail } = useSearch({ from: '/(auth)/sign-up' })
  const { mutateAsync, isPending } = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: prefilledEmail ?? undefined,
    },
  })

  async function onSubmit(data: FormData) {
    const finalEmail =
      config.auth.emailGate && prefilledEmail ? prefilledEmail : data.email

    const result = await submitWithToast(
      mutateAsync({ ...data, email: finalEmail }),
      {
        loading: t('signUp.toast.loading'),
        success: t('signUp.toast.success'),
        error: (error) =>
          t('signUp.toast.error', { error: getErrorMessage(error) }),
      }
    )

    if (!result) return

    navigate({
      to: config.auth.accountVerify ? ROUTES.VERIFICATION : ROUTES.SIGN_IN,
      ...(config.auth.accountVerify && { search: { email: data.email } }),
    })
  }

  return (
    <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='name'>{t('signUp.fields.name.label')}</Label>
          <Input
            id='name'
            type='text'
            placeholder={t('signUp.fields.name.placeholder')}
            autoComplete='name'
            {...register('name')}
          />
          {errors.name && (
            <span className='mt-1 flex items-center gap-1 text-xs font-medium text-destructive'>
              <span className='h-1 w-1 rounded-full bg-destructive' />
              {errors.name.message}
            </span>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <Label htmlFor='email'>{t('signUp.fields.email.label')}</Label>
          <Input
            id='email'
            type='email'
            placeholder={t('signUp.fields.email.placeholder')}
            autoComplete='email'
            disabled={config.auth.emailGate && !!prefilledEmail}
            {...register('email')}
          />
          {errors.email && (
            <span className='mt-1 flex items-center gap-1 text-xs font-medium text-destructive'>
              <span className='h-1 w-1 rounded-full bg-destructive' />
              {errors.email.message}
            </span>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <Label htmlFor='password'>{t('signUp.fields.password.label')}</Label>
          <Input
            id='password'
            type='password'
            placeholder={t('signUp.fields.password.placeholder')}
            autoComplete='new-password'
            {...register('password')}
          />
          {errors.password && (
            <span className='mt-1 flex items-center gap-1 text-xs font-medium text-destructive'>
              <span className='h-1 w-1 rounded-full bg-destructive' />
              {errors.password.message}
            </span>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <Label htmlFor='confirmPassword'>
            {t('signUp.fields.confirmPassword.label')}
          </Label>
          <Input
            id='confirmPassword'
            type='password'
            placeholder={t('signUp.fields.confirmPassword.placeholder')}
            autoComplete='new-password'
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <span className='mt-1 flex items-center gap-1 text-xs font-medium text-destructive'>
              <span className='h-1 w-1 rounded-full bg-destructive' />
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </div>

      <Button
        type='submit'
        className='h-11 w-full font-bold'
        disabled={isPending}
      >
        {isPending ? t('signUp.submitting') : t('signUp.submit')}
      </Button>
    </form>
  )
}
