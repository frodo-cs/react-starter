import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { forgotPasswordSchema } from '../schemas/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForgotPassword } from '../hooks/use-forgot-password'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/error-message'

type FormData = z.infer<typeof forgotPasswordSchema>

type Props = {
  onSuccess?: () => void
}

export function ForgotPasswordForm({ onSuccess }: Props) {
  const { t } = useTranslation('auth')
  const { mutateAsync, isPending } = useForgotPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  async function onSubmit(data: FormData) {
    await toast.promise(mutateAsync(data), {
      loading: t('forgotPassword.toast.loading'),
      success: t('forgotPassword.toast.success'),
      error: (error: unknown) =>
        t('forgotPassword.toast.error', { error: getErrorMessage(error) }),
    })
    onSuccess?.()
  }

  return (
    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>
            {t('forgotPassword.fields.email.label')}
          </Label>
          <Input
            id='email'
            type='email'
            placeholder={t('forgotPassword.fields.email.placeholder')}
            autoComplete='email'
            {...register('email')}
          />
          {errors.email && (
            <span className='mt-1 flex items-center gap-1 text-xs font-medium text-destructive'>
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      <Button
        type='submit'
        className='h-11 w-full font-bold'
        disabled={isPending}
      >
        {isPending
          ? t('forgotPassword.submitting')
          : t('forgotPassword.submit')}
      </Button>
    </form>
  )
}
