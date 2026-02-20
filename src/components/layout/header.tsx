import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { ROUTES } from '@/constant/routes'

export function Header() {
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  const handleLogout = async () => {
    logout()
    await navigate({ to: ROUTES.SIGN_IN })
  }

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white'>
      <div className='flex h-16 items-center justify-between px-6'>
        <div className='flex items-center gap-4'>Icon</div>

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
