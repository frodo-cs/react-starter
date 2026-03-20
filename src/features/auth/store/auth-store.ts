import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { AuthState, AuthStoreData } from '../interfaces'
import { eventBus } from '@/lib/event-bus'
import { queryClient } from '@/query-client'

const INITIAL_STATE: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
}

export const useAuthStore = create<AuthStoreData>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      setAuth: (user, token) => {
        const accessToken = token?.access ?? null
        const refreshToken = token?.refresh ?? null

        set({ user, accessToken, refreshToken })
      },

      logout: () => {
        set(INITIAL_STATE)
        queryClient.clear()
        eventBus.emit('auth:logout')
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),

      partialize: (state): AuthState => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
)

export type AuthStore = typeof useAuthStore
export type AuthStoreState = ReturnType<AuthStore['getState']>
