import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import type { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { signUpSchema } from '../schemas/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRegister } from '../hooks/use-register'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/error-message'
import { ROUTES } from '@/constant/routes'

type FormData = z.infer<typeof signUpSchema>

export function SignUpForm() {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const registerMutation = useRegister()
  const { mutateAsync, isPending } = registerMutation

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  })

  async function onSubmit(data: FormData) {
    await toast.promise(mutateAsync(data), {
      loading: t('signUp.toast.loading'),
      success: t('signUp.toast.success'),
      error: (error: unknown) =>
        t('signUp.toast.error', { error: getErrorMessage(error) }),
    })
    navigate({ to: ROUTES.SIGN_IN })
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
            <span className='mt-1 flex items-center text-xs font-medium text-destructive'>
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
            {...register('email')}
          />
          {errors.email && (
            <span className='mt-1 flex items-center text-xs font-medium text-destructive'>
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
            <span className='mt-1 flex items-center text-xs font-medium text-destructive'>
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
            <span className='mt-1 flex items-center text-xs font-medium text-destructive'>
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
