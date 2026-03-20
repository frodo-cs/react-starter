import type {
  Credentials,
  SignUpPayload,
  IdentifierPayload,
} from '@/features/auth/interfaces/api'
import { apiClient } from '@/lib/api/axios-instance'
import {
  type IAuthAdapter,
  type LoginResponse,
  AUTH_ERRORS,
} from './auth-base.adapter'
import { ENDPOINTS } from '@/constants/endpoints'

interface LoginResponseMockDTO {
  verified: boolean
  accessToken?: string
  user?: {
    id: string
    name: string
    email: string
  }
}

export class AuthAdapterMock implements IAuthAdapter {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private transformLogin(dto: LoginResponseMockDTO): LoginResponse {
    if (!dto.verified) return { verified: false }
    return {
      verified: true,
      user: {
        id: dto.user!.id,
        name: dto.user!.name,
        email: dto.user!.email,
      },
      token: dto.accessToken!,
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
      if (
        error instanceof Error &&
        error.message.includes('Email already in use')
      ) {
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
