import { Link } from '@tanstack/react-router'
import { LayoutDashboard, ChevronRight } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/constant/routes'

export function Sidebar() {
  const { t } = useTranslation('general')

  const navItems = [
    {
      label: t('navigation.dashboard'),
      icon: LayoutDashboard,
      to: ROUTES.HOME,
    },
  ]

  return (
    <Card>
      <CardHeader className='pb-2'>
        <div className='flex items-center gap-2'>
          <CardTitle className='text-sm font-bold'>
            {t('layout.sidebar')}
          </CardTitle>
        </div>
        <CardDescription className='text-xs font-medium text-muted-foreground'>
          {t('layout.sidebar')}
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-2'>
        <nav className='flex flex-col gap-2'>
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              activeProps={{
                className:
                  'bg-primary text-primary-foreground shadow-lg shadow-primary/20',
              }}
              inactiveProps={{
                className:
                  'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              }}
              className='group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200'
            >
              <div className='flex items-center gap-3'>
                <item.icon className='h-5 w-5 text-current transition-transform duration-200 group-hover:scale-110' />
                {item.label}
              </div>
              <ChevronRight className='h-4 w-4 translate-x-1 opacity-0 transition-opacity group-hover:opacity-100' />
            </Link>
          ))}
        </nav>
      </CardContent>
    </Card>
  )
}
