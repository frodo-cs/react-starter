import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { ErrorBoundary } from './error-boundary'

function ErrorFallback() {
  const { t } = useTranslation('error')

  return (
    <div className='flex h-full items-center justify-center'>
      <Card className='w-full max-w-md text-center'>
        <CardHeader>
          <CardTitle className='text-2xl font-normal text-destructive'>
            {t('internalServerError.title')}
          </CardTitle>
          <CardDescription className='text-base'>
            {t('internalServerError.message')}
          </CardDescription>
        </CardHeader>

        <CardFooter className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <Button
            variant='outline'
            onClick={() => window.location.reload()}
            className='h-10 w-full sm:w-auto'
          >
            {t('internalServerError.actions.retry') || 'Retry'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

interface ErrorBoundaryContentProps {
  children: ReactNode
}

export function ErrorBoundaryContent({ children }: ErrorBoundaryContentProps) {
  return <ErrorBoundary fallback={<ErrorFallback />}>{children}</ErrorBoundary>
}
