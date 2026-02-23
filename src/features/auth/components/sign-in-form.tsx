import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearch, useRouter, Link } from '@tanstack/react-router'
import type { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { signInSchema } from '../schemas/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLogin } from '../hooks/use-login'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/error-message'
import type { AuthUser } from '../interfaces/auth'
import { ROUTES } from '@/constants/routes'

type FormData = z.infer<typeof signInSchema>

export function SignInForm() {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const router = useRouter()
  const { redirect } = useSearch({ from: '/(auth)/sign-in' })
  const loginMutation = useLogin()
  const { mutateAsync, isPending } = loginMutation

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
  })

  async function onSubmit(data: FormData) {
    try {
      const loginPromise = mutateAsync(data)
      toast.promise(loginPromise, {
        loading: t('signIn.toast.loading'),
        success: (response: { user: AuthUser }) =>
          t('signIn.toast.success', { identifier: response.user.username }),
        error: (error: unknown) =>
          t('signIn.toast.error', { error: getErrorMessage(error) }),
      })
      await loginPromise
      await router.invalidate()
      const targetPath = (redirect as string) || ROUTES.HOME
      navigate({ to: targetPath, replace: true })
    } catch {
      // error already handled by toast
    }
  }

  return (
    <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='email'>{t('signIn.fields.email.label')}</Label>
          <Input
            id='email'
            type='email'
            placeholder={t('signIn.fields.email.placeholder')}
            autoComplete='email'
            {...register('email')}
          />
          {errors.email && (
            <span className='mt-1 flex items-center text-xs font-medium text-destructive'>
              <span className='mr-1 h-1 w-1 rounded-full bg-destructive'></span>
              {errors.email.message}
            </span>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='password'>
              {t('signIn.fields.password.label')}
            </Label>
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className='text-xs font-bold text-primary transition-all hover:underline'
            >
              {t('signIn.fields.password.forgotPassword')}
            </Link>
          </div>
          <Input
            id='password'
            type='password'
            placeholder={t('signIn.fields.password.placeholder')}
            autoComplete='current-password'
            {...register('password')}
          />
          {errors.password && (
            <span className='mt-1 flex items-center text-xs font-medium text-destructive'>
              <span className='mr-1 h-1 w-1 rounded-full bg-destructive'></span>
              {errors.password.message}
            </span>
          )}
        </div>
      </div>

      <Button
        type='submit'
        className='h-11 w-full font-bold'
        disabled={isPending}
      >
        {isPending ? t('signIn.submitting') : t('signIn.submit')}
      </Button>
    </form>
  )
}
