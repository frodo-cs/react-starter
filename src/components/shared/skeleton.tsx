import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-sm bg-muted',
        'after:animate-shimmer after:absolute after:inset-0 after:z-0 after:bg-linear-to-r after:from-transparent after:via-foreground/5 after:to-transparent after:bg-size-[200%_100%]',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
