import { toast } from 'sonner'

import { getErrorMessage } from './error-message'

export async function submitWithToast<T>(
  promise: Promise<T>,
  messages: {
    loading: string
    success: string | ((result: T) => string)
    error: string | ((error: unknown) => string)
  },
  onSuccess?: (result: T) => void,
  onError?: (error: unknown) => void
): Promise<T | undefined> {
  toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: (error: unknown) =>
      typeof messages.error === 'function'
        ? messages.error(error)
        : getErrorMessage(error) || messages.error,
  })

  try {
    const result = await promise
    onSuccess?.(result)
    return result
  } catch (error) {
    onError?.(error)
  }
}
