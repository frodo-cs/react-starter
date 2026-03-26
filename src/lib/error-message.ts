import { isAxiosError } from 'axios'

import i18n from '@/configs/i18n'
import { AUTH_ERRORS } from '@/features/auth/constants/auth'

export function getErrorMessage(error: unknown) {
  if (isAxiosError(error)) {
    if (!error.response) {
      return i18n.t('general:general.networkError')
    }

    const { status, data } = error.response

    if (status === 404) return i18n.t('general:general.notFound')
    if (status === 403) return i18n.t('general:general.forbidden')
    if (status >= 500) return i18n.t('general:general.serverError')

    if (typeof data === 'string') return data
    if (data && typeof data === 'object' && 'message' in data) {
      return String(data.message)
    }
    return error.message
  }

  if (error instanceof Error) {
    const authErrorKeys = Object.values(AUTH_ERRORS) as string[]

    if (authErrorKeys.includes(error.message)) {
      return i18n.t(`auth:errors.${error.message}`)
    }

    return error.message
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }

  return i18n.t('general:general.unexpectedError')
}
