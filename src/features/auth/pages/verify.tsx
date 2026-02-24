import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { VerificationForm } from '../components/verification-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ROUTES } from '@/constants/routes'

export function Verify() {
  const { t } = useTranslation('auth')

  return (
    <div className='flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle className='text-3xl font-bold tracking-tight text-foreground'>
            {t('verification.title')}
          </CardTitle>
          <CardDescription className='font-medium text-muted-foreground'>
            {t('verification.subtitle')}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <VerificationForm />
        </CardContent>

        <CardFooter className='flex justify-center border-t pt-6'>
          <p className='text-sm font-medium text-muted-foreground'>
            <Link
              to={ROUTES.SIGN_IN}
              className='font-bold text-primary transition-all hover:underline'
            >
              {t('verification.footer.link')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
