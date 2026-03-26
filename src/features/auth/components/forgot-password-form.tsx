import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { InputField } from '@/components/shared/input-field'
import { Button } from '@/components/ui/button'
import { getErrorMessage } from '@/lib/error-message'
import { submitWithToast } from '@/lib/toast-promise'

import { useForgotPassword } from '../hooks/use-forgot-password'
import type { IdentifierPayload } from '../interfaces/api'
import { createIdentifierSchema } from '../schemas/auth'

interface Props {
  onSuccess?: () => void
}

export function ForgotPasswordForm({ onSuccess }: Props) {
  const { t } = useTranslation('auth')
  const { mutateAsync, isPending } = useForgotPassword()
  const identifierSchema = createIdentifierSchema()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IdentifierPayload>({
    resolver: zodResolver(identifierSchema),
  })

  async function onSubmit(data: IdentifierPayload) {
    const result = await submitWithToast(mutateAsync(data), {
      loading: t('forgotPassword.toast.loading'),
      success: t('forgotPassword.toast.success'),
      error: (error) => t('forgotPassword.toast.error', { error: getErrorMessage(error) }),
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

      <Button type='submit' className='h-11 w-full font-bold' disabled={isPending}>
        {isPending ? t('forgotPassword.submitting') : t('forgotPassword.submit')}
      </Button>
    </form>
  )
}
