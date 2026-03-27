import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { AuthLayout } from '@/components/layout/auth-layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ROUTES } from '@/constants/routes'

import { SignInForm } from '../components/sign-in-form'

export function SignIn() {
  const { t } = useTranslation('auth')

  return (
    <AuthLayout>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle className='text-3xl font-bold tracking-tight text-foreground'>
            {t('signIn.title')}
          </CardTitle>
          <CardDescription className='font-medium text-muted-foreground'>
            {t('signIn.subtitle')}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SignInForm />
        </CardContent>

        <CardFooter className='flex flex-col space-y-4 border-t pt-6 text-center'>
          <p className='text-sm font-medium text-muted-foreground'>
            {t('signIn.footer.text')}{' '}
            <Link
              to={ROUTES.SIGN_UP}
              className='font-bold text-primary transition-all hover:underline'
            >
              {t('signIn.footer.link')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
