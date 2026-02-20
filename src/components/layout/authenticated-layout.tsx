import type { ReactNode } from 'react'
import { Header } from './header'
import { Sidebar } from './sidebar'
import { Contact } from './information'
import { Outlet } from '@tanstack/react-router'

type AuthenticatedLayoutProps = {
  children?: ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <Header />

      <div className='flex flex-1 overflow-hidden'>
        <aside className='hidden w-72 shrink-0 p-4 lg:block'>
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
