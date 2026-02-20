import type { AuthUser } from '@/features/auth/interfaces/auth'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  user: AuthUser | null
  accessToken: string | null
  tokenScheme: 'Bearer' | 'Zoho-oauthtoken'
  setAuth: (user: AuthUser, accessToken: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      tokenScheme: 'Bearer',
      setAuth: (user, accessToken) => set({ user, accessToken }),
      logout: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        tokenScheme: state.tokenScheme,
      }),
    }
  )
)
