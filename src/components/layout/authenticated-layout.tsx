import { Outlet } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { type ReactNode, useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { ErrorBoundaryContent } from '@/features/errors/components/error-boundary-content'

import { Header } from './header'
import { Contact } from './information'
import { Sidebar } from './sidebar'

interface AuthenticatedLayoutProps {
  children?: ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((prev) => !prev), [])

  useEffect(() => {
    if (!window) return
    const mql = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (mql.matches) {
        setIsMobileMenuOpen(false)
      }
    }

    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <Header onMenuClick={toggleMobileMenu} />

      <div className='relative flex flex-1 overflow-hidden'>
        {isMobileMenuOpen && (
          <div
            role='button'
            tabIndex={-1}
            className='fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden'
            onClick={() => setIsMobileMenuOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsMobileMenuOpen(false)
              }
            }}
          />
        )}

        {/* Mobile */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-full transform bg-background p-4 transition-transform duration-300 ease-in-out sm:w-1/2 lg:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className='flex h-full flex-col gap-4'>
            <div className='flex items-center justify-between lg:hidden'>
              <span className='font-bold'>Menu</span>
              <Button variant='ghost' size='icon' onClick={() => setIsMobileMenuOpen(false)}>
                <X className='h-5 w-5' />
              </Button>
            </div>
            <Sidebar onItemClick={() => setIsMobileMenuOpen(false)} />
            <Contact />
          </div>
        </aside>

        {/* Desktop */}
        <div className='mx-auto flex w-full max-w-360'>
          <aside className='hidden w-80 shrink-0 p-0 md:p-8 lg:block'>
            <div className='flex h-full flex-col gap-4 overflow-y-auto'>
              <Sidebar />
              <Contact />
            </div>
          </aside>

          <main className='flex-1 overflow-y-auto'>
            <div className='mx-auto max-w-7xl p-6 md:p-8'>
              <ErrorBoundaryContent>{children ?? <Outlet />}</ErrorBoundaryContent>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
