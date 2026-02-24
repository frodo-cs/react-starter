import { Link } from '@tanstack/react-router'
import { EmailGateForm } from '@/features/auth/components/email-gate-form'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { ROUTES } from '@/constants/routes'

export function EmailGate() {
  const { t } = useTranslation('auth')

  return (
    <div className='flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle className='text-3xl font-bold tracking-tight text-foreground'>
            {t('emailGate.title')}
          </CardTitle>
          <CardDescription className='font-medium text-muted-foreground'>
            {t('emailGate.subtitle')}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <EmailGateForm />
        </CardContent>

        <CardFooter className='flex flex-col space-y-4 border-t pt-6 text-center'>
          <p className='text-sm font-medium text-muted-foreground'>
            {t('emailGate.footer.text')}{' '}
            <Link
              to={ROUTES.SIGN_IN}
              className='font-bold text-primary transition-all hover:underline'
            >
              {t('emailGate.footer.link')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
