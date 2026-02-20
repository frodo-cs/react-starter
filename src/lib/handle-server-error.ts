import { toast } from 'sonner'
import { getErrorMessage } from './error-message'

export function handleServerError(error: unknown) {
  const message = getErrorMessage(error)
  toast.error(message)
}
