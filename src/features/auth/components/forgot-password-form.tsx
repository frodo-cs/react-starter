import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { identifierSchema } from '../schemas/auth'
import { Button } from '@/components/ui/button'
import { InputField } from '@/components/shared/input-field'
import { useForgotPassword } from '../hooks/use-forgot-password'
import { getErrorMessage } from '@/lib/error-message'
import { submitWithToast } from '@/lib/toast-promise'

type FormData = z.infer<typeof identifierSchema>

interface Props {
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
    resolver: zodResolver(identifierSchema),
  })

  async function onSubmit(data: FormData) {
    const result = await submitWithToast(mutateAsync(data), {
      loading: t('forgotPassword.toast.loading'),
      success: t('forgotPassword.toast.success'),
      error: (error) =>
        t('forgotPassword.toast.error', { error: getErrorMessage(error) }),
    })

    if (!result) return

    onSuccess?.()
  }

  return (
    <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        <InputField
          id='identifier'
          label={t('forgotPassword.fields.identifier.label')}
          type='text'
          placeholder={t('forgotPassword.fields.identifier.placeholder')}
          autoComplete='username'
          error={errors.identifier}
          {...register('identifier')}
        />
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
