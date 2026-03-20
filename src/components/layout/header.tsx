import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button'
import { LogOut, Menu } from 'lucide-react'
import { ROUTES } from '@/constants/routes'

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  const handleLogout = async () => {
    logout()
    await navigate({ to: ROUTES.SIGN_IN })
  }

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white'>
      <div className='mx-auto flex h-16 w-full max-w-360 items-center justify-between px-4 sm:px-6 lg:px-12'>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='icon'
            onClick={onMenuClick}
            className='lg:hidden'
          >
            <Menu className='h-5 w-5' />
          </Button>
          <span className='font-bold'>Icon</span>
        </div>

        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='icon'
            onClick={handleLogout}
            className='text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive'
          >
            <LogOut className='h-5 w-5' />
          </Button>
        </div>
      </div>
    </header>
  )
}
