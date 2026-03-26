import type { AuthUser } from './auth'

export interface AuthState {
  user: AuthUser | null
  accessToken: string | null
}

export interface AuthActions {
  setAuth: (user: AuthUser, token?: string) => void
  refreshAuth: (token: string) => void
  logout: () => void
}

export type AuthStoreData = AuthState & AuthActions
