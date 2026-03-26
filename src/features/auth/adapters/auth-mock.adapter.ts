import { ENDPOINTS } from '@/constants/endpoints'
import type { Credentials, IdentifierPayload, SignUpPayload } from '@/features/auth/interfaces/api'
import { apiClient } from '@/lib/api/axios-instance'

import { AUTH_ERRORS } from '../constants/auth'
import { type IAuthAdapter, type LoginResponse } from './auth-base.adapter'

interface LoginResponseMockDTO {
  accessToken?: string
  user?: {
    id: string
    name: string
    username: string
  }
}

export class AuthAdapterMock implements IAuthAdapter {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private transformLogin(dto: LoginResponseMockDTO): LoginResponse {
    if (!dto.user || !dto.accessToken) {
      throw new Error(AUTH_ERRORS.SIGN_IN_ERROR)
    }

    return {
      token: dto.accessToken,
      user: {
        id: dto.user.id,
        identifier: dto.user.username,
        name: dto.user.name,
      },
    }
  }

  async login(credentials: Credentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponseMockDTO>(
      `${this.baseUrl}/${ENDPOINTS.LOGIN}`,
      {
        identifier: credentials.identifier,
        password: credentials.password,
      }
    )

    return this.transformLogin(response.data)
  }

  async register(payload: SignUpPayload): Promise<void> {
    try {
      await apiClient.post(`${this.baseUrl}/${ENDPOINTS.REGISTER}`, {
        name: payload.name,
        identifier: payload.identifier,
        password: payload.password,
      })
    } catch (error) {
      if (error instanceof Error && error.message.includes('Email already in use')) {
        throw new Error(AUTH_ERRORS.EMAIL_ALREADY_IN_USE)
      }
      throw error
    }
  }

  async forgotPassword(payload: IdentifierPayload): Promise<void> {
    await apiClient.post(`${this.baseUrl}/${ENDPOINTS.FORGOT_PASSWORD}`, {
      identifier: payload.identifier,
    })
  }
}
