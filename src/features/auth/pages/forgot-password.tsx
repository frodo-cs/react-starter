import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ROUTES } from '@/constants/routes'

import { ForgotPasswordForm } from '../components/forgot-password-form'

export function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false)
  const { t } = useTranslation('auth')

  if (submitted) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
        <Card className='w-full max-w-md'>
          <CardHeader className='text-center'>
            <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
              <svg
                className='h-8 w-8 text-primary'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
            </div>
            <CardTitle className='text-3xl font-bold tracking-tight text-foreground'>
              {t('forgotPassword.success.title')}
            </CardTitle>
            <CardDescription className='mt-2 font-medium text-muted-foreground'>
              {t('forgotPassword.success.message')}
            </CardDescription>
          </CardHeader>
          <CardFooter className='flex flex-col pt-4'>
            <Button asChild className='h-11 w-full font-bold'>
              <Link to={ROUTES.SIGN_IN}>{t('forgotPassword.success.action')}</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle className='text-3xl font-bold tracking-tight text-foreground'>
            {t('forgotPassword.title')}
          </CardTitle>
          <CardDescription className='font-medium text-muted-foreground'>
            {t('forgotPassword.subtitle')}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ForgotPasswordForm onSuccess={() => setSubmitted(true)} />
        </CardContent>

        <CardFooter className='flex justify-center border-t pt-6'>
          <Link
            to={ROUTES.SIGN_IN}
            className='flex items-center gap-2 text-sm font-bold text-muted-foreground transition-all hover:text-primary'
          >
            <ArrowLeft size={16} />
            {t('forgotPassword.footer.link')}
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
