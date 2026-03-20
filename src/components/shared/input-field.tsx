import type * as React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { FieldError } from 'react-hook-form'

interface InputFieldProps extends Omit<
  React.ComponentProps<'input'>,
  'prefix'
> {
  label?: string
  error?: FieldError | string | string[]
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

export function InputField({
  label,
  error,
  prefix,
  suffix,
  id,
  className,
  ref,
  ...props
}: InputFieldProps) {
  const getErrorMessages = () => {
    if (!error) return []
    if (typeof error === 'string') return [error]
    if (Array.isArray(error)) return error
    if (typeof error === 'object' && 'types' in error && error.types) {
      return Object.values(error.types).flat() as string[]
    }
    if (typeof error === 'object' && 'message' in error) {
      return [error.message as string]
    }
    return []
  }

  const errorMessages = getErrorMessages().filter(Boolean)
  const hasError = errorMessages.length > 0
  const errorId = hasError ? `${id}-error` : undefined

  return (
    <div className='flex flex-col gap-2'>
      {label && (
        <Label htmlFor={id} className={cn(hasError && 'text-destructive')}>
          {label}
        </Label>
      )}
      <div className='relative flex items-center'>
        {prefix && (
          <div className='pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground'>
            {prefix}
          </div>
        )}
        <Input
          id={id}
          ref={ref}
          className={cn(
            prefix && 'pl-10',
            suffix && 'pr-10',
            hasError && 'border-destructive focus-visible:ring-destructive',
            className
          )}
          aria-invalid={hasError}
          aria-describedby={errorId}
          {...props}
        />
        {suffix && (
          <div className='absolute inset-y-0 right-3 flex items-center'>
            {suffix}
          </div>
        )}
      </div>
      {hasError && (
        <div id={errorId} className='mt-1 flex flex-col gap-1'>
          {errorMessages.map((msg) => (
            <span
              key={msg}
              className='flex items-center gap-1 text-xs font-medium text-destructive'
            >
              <span className='h-1 w-1 rounded-full bg-destructive' />
              {msg}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
