import type { AuthUser } from './auth'

export interface Token {
  access?: string
  refresh?: string
  type?: string
}

export interface AuthState {
  user: AuthUser | null
  accessToken: string | null
  refreshToken: string | null
}

export interface AuthActions {
  setAuth: (user: AuthUser, token?: Token) => void
  logout: () => void
}

export type AuthStoreData = AuthState & AuthActions
