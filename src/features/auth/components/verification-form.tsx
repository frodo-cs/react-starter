import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearch } from '@tanstack/react-router'
import type { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { verificationSchema } from '../schemas/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/error-message'
import { ROUTES } from '@/constants/routes'
import { useVerification } from '../hooks/use-verification'
import { useResendCode } from '../hooks/use-resend-code'

type FormData = z.infer<typeof verificationSchema>

/**
 * Form component for account verification.
 *
 * Handles submission of 6-digit verification codes sent via email.
 */
export function VerificationForm() {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const { email } = useSearch({ from: '/(auth)/verify' })
  const { mutateAsync, isPending } = useVerification()
  const { mutateAsync: resendCode, isPending: isResending } = useResendCode()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(verificationSchema),
  })

  async function onSubmit(data: FormData) {
    try {
      const verificationPromise = mutateAsync({ email, code: data.code })
      toast.promise(verificationPromise, {
        loading: t('verification.toast.loading'),
        success: t('verification.toast.success'),
        error: (error: unknown) =>
          t('verification.toast.error', { error: getErrorMessage(error) }),
      })
      await verificationPromise
      navigate({ to: ROUTES.SIGN_IN })
    } catch {
      // error already handled by toast.promise
    }
  }

  async function onResend() {
    try {
      const resendCodePromise = resendCode({ email })
      await toast.promise(resendCodePromise, {
        loading: t('verification.resend.loading'),
        success: t('verification.resend.success'),
        error: (error: unknown) =>
          t('verification.resend.error', { error: getErrorMessage(error) }),
      })
      await resendCodePromise
    } catch {
      // error already handled by toast
    }
  }

  return (
    <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='code'>{t('verification.fields.code.label')}</Label>
          <Input
            id='code'
            type='text'
            inputMode='numeric'
            maxLength={6}
            placeholder={t('verification.fields.code.placeholder')}
            autoComplete='one-time-code'
            {...register('code')}
          />
          {errors.code && (
            <span className='mt-1 flex items-center gap-1 text-xs font-medium text-destructive'>
              <span className='h-1 w-1 rounded-full bg-destructive' />
              {errors.code.message}
            </span>
          )}
        </div>
      </div>

      <Button
        type='submit'
        className='h-11 w-full font-bold'
        disabled={isPending}
      >
        {isPending ? t('verification.submitting') : t('verification.submit')}
      </Button>

      <button
        type='button'
        className='text-xs font-medium text-muted-foreground transition-colors hover:text-primary disabled:pointer-events-none disabled:opacity-50'
        disabled={isResending}
        onClick={onResend}
      >
        {isResending
          ? t('verification.resend.submitting')
          : t('verification.resend.action')}
      </button>
    </form>
  )
}
