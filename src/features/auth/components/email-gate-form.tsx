import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import type { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { emailSchema } from '../schemas/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/error-message'
import { ROUTES } from '@/constants/routes'
import { useEmailGate } from '../hooks/use-email-gate'

type FormData = z.infer<typeof emailSchema>

/**
 * "Pre-sign up" form that validates an email against a client database.
 *
 * If a client is found, redirects to the registration form with
 * the email prefilled.
 */
export function EmailGateForm() {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useEmailGate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(emailSchema),
  })

  async function onSubmit(data: FormData) {
    try {
      const emailGatePromise = mutateAsync(data)
      toast.promise(emailGatePromise, {
        loading: t('emailGate.toast.loading'),
        success: t('emailGate.toast.success'),
        error: (error: unknown) =>
          t('emailGate.toast.error', { error: getErrorMessage(error) }),
      })
      const result = await emailGatePromise
      navigate({
        to: ROUTES.SIGN_UP,
        search: { email: result.user?.email },
      })
    } catch {
      // error already handled by toast.promise
    }
  }

  return (
    <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='email'>{t('emailGate.fields.emailGate.label')}</Label>
          <Input
            id='email'
            type='email'
            placeholder={t('emailGate.fields.emailGate.placeholder')}
            autoComplete='email'
            {...register('email')}
          />
          {errors.email && (
            <span className='mt-1 flex items-center gap-1 text-xs font-medium text-destructive'>
              <span className='h-1 w-1 rounded-full bg-destructive' />
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
        {isPending ? t('emailGate.submitting') : t('emailGate.submit')}
      </Button>
    </form>
  )
}
