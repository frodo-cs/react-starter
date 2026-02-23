import type {
  Credentials,
  SignUpPayload,
  ForgotPasswordPayload,
} from '@/features/auth/interfaces/api'
import { apiClient } from '@/lib/api/axios-instance'
import type { IAuthAdapter, LoginResponse } from './auth-base.adapter'
import { ENDPOINTS } from '@/constants/endpoints'

interface LoginResponseMockDTO {
  accessToken: string
  user: {
    username: string
    email: string
  }
}

export class AuthAdapterMock implements IAuthAdapter {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private transform(dto: LoginResponseMockDTO): LoginResponse {
    return {
      user: {
        username: dto.user.username,
        email: dto.user.email,
      },
      token: dto.accessToken,
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

    return this.transform(response.data)
  }

  async register(payload: SignUpPayload): Promise<void> {
    await apiClient.post(`${this.baseUrl}/${ENDPOINTS.REGISTER}`, {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    })
  }

  async forgotPassword(payload: ForgotPasswordPayload): Promise<void> {
    await apiClient.post(`${this.baseUrl}/${ENDPOINTS.FORGOT_PASSWORD}`, {
      email: payload.email,
    })
  }
}
