import { useNavigate, useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function UnauthorizedError() {
  const { t } = useTranslation('error')
  const navigate = useNavigate()
  const { history } = useRouter()

  return (
    <div className='flex min-h-screen items-center justify-center bg-linear-to-br from-destructive/5 via-background to-accent/5 p-6'>
      <Card className='w-full max-w-md border-border text-center shadow-2xl transition-all duration-300'>
        <CardHeader className='space-y-2'>
          <div className='text-6xl font-bold text-destructive'>401</div>
          <CardTitle className='text-3xl font-bold text-foreground'>
            {t('unauthorized.title')}
          </CardTitle>
          <CardDescription className='text-lg text-muted-foreground'>
            {t('unauthorized.message')}
          </CardDescription>
        </CardHeader>

        <CardFooter className='flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center'>
          <Button
            variant='destructive'
            onClick={() => navigate({ to: ROUTES.SIGN_IN })}
            className='h-10 w-full font-bold sm:w-auto'
          >
            {t('unauthorized.actions.login')}
          </Button>
          <Button
            variant='outline'
            onClick={() => history.back()}
            className='h-10 w-full font-bold sm:w-auto'
          >
            {t('unauthorized.actions.back')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
