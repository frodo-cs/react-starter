import { type ReactNode } from 'react'

import { ErrorBoundaryContent } from '@/features/errors/components/error-boundary-content'

import { LanguageSwitcher } from './language-switcher'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center bg-background'>
      <div className='absolute top-4 right-4 md:top-8 md:right-8'>
        <LanguageSwitcher />
      </div>
      <div className='w-full max-w-sm p-4'>
        <ErrorBoundaryContent>{children}</ErrorBoundaryContent>
      </div>
    </div>
  )
}
