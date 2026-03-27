import { Toaster as Sonner, type ToasterProps } from 'sonner'

import { useThemeStore } from '@/stores/theme-store'

export function Toaster({ ...props }: ToasterProps) {
  const { theme } = useThemeStore()

  return (
    <Sonner
      theme={theme}
      className='toaster group [&_div[data-content]]:w-full'
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}
