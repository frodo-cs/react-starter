import { isAxiosError } from 'axios'
import i18n from '@/config/i18n'

export function getErrorMessage(error: unknown) {
  if (isAxiosError(error)) {
    return error.response?.data || error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }

  return i18n.t('general:general.unexpectedError')
}
