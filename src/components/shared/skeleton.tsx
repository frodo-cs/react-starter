import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-sm bg-gray-100',
        'after:animate-shimmer after:absolute after:inset-0 after:z-0 after:bg-linear-to-r after:from-transparent after:via-white/50 after:to-transparent after:bg-size-[200%_100%]',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
