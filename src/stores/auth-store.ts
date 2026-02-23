import type { AuthUser } from '@/features/auth/interfaces/auth'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthStoreData {
  user: AuthUser | null
  accessToken: string | null
  setAuth: (user: AuthUser, accessToken: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStoreData>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: (user, accessToken) => set({ user, accessToken }),
      logout: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
)

export type AuthStore = typeof useAuthStore
export type AuthState = ReturnType<AuthStore['getState']>
