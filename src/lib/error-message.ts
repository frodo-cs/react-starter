import { isAxiosError } from 'axios'
import i18n from '@/configs/i18n'

export function getErrorMessage(error: unknown) {
  if (isAxiosError(error)) {
    const data = error.response?.data
    if (typeof data === 'string') return data
    if (data && typeof data === 'object' && 'message' in data) {
      return String(data.message)
    }
    return error.message
  }

  if (error instanceof Error) {
    if (error.message === 'userNotFound') {
      return i18n.t('auth:errors.userNotFound')
    }
    if (error.message === 'invalidCode') {
      return i18n.t('auth:errors.invalidCode')
    }
    if (error.message === 'emailAlreadyInUse') {
      return i18n.t('auth:errors.emailAlreadyInUse')
    }
    return error.message
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }

  return i18n.t('general:general.unexpectedError')
}
