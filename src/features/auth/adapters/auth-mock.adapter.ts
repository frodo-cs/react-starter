import type {
  Credentials,
  SignUpPayload,
  EmailPayload,
  VerifyPayload,
} from '@/features/auth/interfaces/api'
import { apiClient } from '@/lib/api/axios-instance'
import {
  type EmailGateResponse,
  type IAuthAdapter,
  type LoginResponse,
  type VerifyResponse,
  AUTH_ERRORS,
} from './auth-base.adapter'
import { ENDPOINTS } from '@/constants/endpoints'

interface LoginResponseMockDTO {
  verified: boolean
  accessToken?: string
  user?: {
    username: string
    email: string
  }
}

interface EmailGateResponseMockDTO {
  user: {
    id: string
    name: string
    email: string
  } | null
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
        username: dto.user!.username,
        email: dto.user!.email,
      },
      token: dto.accessToken!,
    }
  }

  private transformEmailGate(dto: EmailGateResponseMockDTO): EmailGateResponse {
    if (!dto.user) return { user: null }
    return {
      user: {
        id: dto.user.id,
        email: dto.user.email,
      },
    }
  }

  async login(credentials: Credentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponseMockDTO>(
      `${this.baseUrl}/${ENDPOINTS.LOGIN}`,
      {
        identifier: credentials.email,
        password: credentials.password,
      }
    )

    return this.transformLogin(response.data)
  }

  async register(payload: SignUpPayload): Promise<void> {
    try {
      await apiClient.post(`${this.baseUrl}/${ENDPOINTS.REGISTER}`, {
        name: payload.name,
        email: payload.email,
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

  async forgotPassword(payload: EmailPayload): Promise<void> {
    await apiClient.post(`${this.baseUrl}/${ENDPOINTS.FORGOT_PASSWORD}`, {
      email: payload.email,
    })
  }

  async emailGate(payload: EmailPayload): Promise<EmailGateResponse> {
    const response = await apiClient.post<EmailGateResponseMockDTO>(
      `${this.baseUrl}/${ENDPOINTS.EMAIL_GATE}`,
      {
        email: payload.email,
      }
    )

    const result = this.transformEmailGate(response.data)
    if (!result.user) {
      throw new Error(AUTH_ERRORS.USER_NOT_FOUND)
    }

    return result
  }

  async verify(payload: VerifyPayload): Promise<VerifyResponse> {
    const response = await apiClient.post<VerifyResponse>(
      `${this.baseUrl}/${ENDPOINTS.VERIFY}`,
      {
        email: payload.email,
        code: payload.code,
      }
    )

    if (response.data.verified === false) {
      throw new Error(AUTH_ERRORS.INVALID_CODE)
    }

    return response.data
  }

  async resendCode(payload: EmailPayload): Promise<void> {
    await apiClient.post(`${this.baseUrl}/${ENDPOINTS.RESEND_CODE}`, {
      email: payload.email,
    })
  }
}
