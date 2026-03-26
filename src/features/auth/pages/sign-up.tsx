import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ROUTES } from '@/constants/routes'

import { SignUpForm } from '../components/sign-up-form'

export function SignUp() {
  const { t } = useTranslation('auth')

  return (
    <div className='flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle className='text-3xl font-bold tracking-tight text-foreground'>
            {t('signUp.title')}
          </CardTitle>
          <CardDescription className='font-medium text-muted-foreground'>
            {t('signUp.subtitle')}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SignUpForm />
        </CardContent>

        <CardFooter className='flex flex-col space-y-4 border-t pt-6 text-center'>
          <p className='text-sm font-medium text-muted-foreground'>
            {t('signUp.footer.text')}{' '}
            <Link
              to={ROUTES.SIGN_IN}
              className='font-bold text-primary transition-all hover:underline'
            >
              {t('signUp.footer.link')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
