import { useState, type ReactNode } from 'react'
import { Header } from './header'
import { Sidebar } from './sidebar'
import { Contact } from './information'
import { Outlet } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

type AuthenticatedLayoutProps = {
  children?: ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <Header onMenuClick={toggleMobileMenu} />

      <div className='relative flex flex-1 overflow-hidden'>
        {isMobileMenuOpen && (
          <div
            className='fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden'
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-full transform bg-background p-4 transition-transform duration-300 ease-in-out lg:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className='flex h-full flex-col gap-4'>
            <div className='flex items-center justify-between md:hidden'>
              <span className='font-bold'>Menu</span>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className='h-5 w-5' />
              </Button>
            </div>
            <Sidebar onItemClick={() => setIsMobileMenuOpen(false)} />
            <Contact />
          </div>
        </aside>

        {/* Desktop */}
        <aside className='hidden w-72 shrink-0 p-4 md:block'>
          <div className='flex h-full flex-col gap-4 overflow-y-auto'>
            <Sidebar />
            <Contact />
          </div>
        </aside>

        <main className='flex-1 overflow-y-auto'>
          <div className='mx-auto max-w-7xl p-6 md:p-8'>
            {children ?? <Outlet />}
          </div>
        </main>
      </div>
    </div>
  )
}
