import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

import { IS_MOCK } from '@/constants/constants'
import { AUTH_ERRORS } from '@/features/auth/constants/auth'
import { useAuthStore } from '@/features/auth/store/auth-store'
import { isPublicAuthEndpoint } from '@/features/auth/utils/public-auth'

import { getApiTimeout } from '../utils'
import { assertTokenNotExpired } from '../verify-token'

export const apiClient = axios.create({
  timeout: getApiTimeout(),
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use(
  async (config) => {
    if (isPublicAuthEndpoint(config.url)) return config

    const { accessToken } = useAuthStore.getState()

    if (!accessToken) {
      return Promise.reject(new Error(AUTH_ERRORS.SESSION_EXPIRED_ERROR))
    } else if (!IS_MOCK) {
      assertTokenNotExpired(accessToken)
    }

    config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig
    const isPublicEndpoint = isPublicAuthEndpoint(originalRequest?.url)
    if (error.response?.status === 401 && !isPublicEndpoint) {
      return Promise.reject(new Error(AUTH_ERRORS.SESSION_EXPIRED_ERROR))
    }

    return Promise.reject(error)
  }
)
