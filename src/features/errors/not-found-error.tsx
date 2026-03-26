import { useNavigate, useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/constants/routes'

export function NotFoundError() {
  const { t } = useTranslation('error')
  const navigate = useNavigate()
  const { history } = useRouter()

  return (
    <div className='flex min-h-screen items-center justify-center bg-linear-to-br from-primary/5 via-background to-accent/5 p-6'>
      <Card className='w-full max-w-md border-border text-center shadow-2xl'>
        <CardHeader className='space-y-2'>
          <div className='text-6xl font-bold text-primary'>404</div>
          <CardTitle className='text-3xl font-bold text-foreground'>
            {t('notFound.title')}
          </CardTitle>
          <CardDescription className='text-lg text-muted-foreground'>
            {t('notFound.message')}
          </CardDescription>
        </CardHeader>

        <CardFooter className='flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center'>
          <Button
            onClick={() => navigate({ to: ROUTES.HOME })}
            className='w-full font-bold sm:w-auto'
          >
            {t('notFound.actions.home')}
          </Button>
          <Button
            variant='outline'
            onClick={() => history.back()}
            className='w-full font-bold sm:w-auto'
          >
            {t('notFound.actions.back')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
