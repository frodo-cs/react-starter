import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { eventBus } from '@/lib/event-bus'
import { queryClient } from '@/query-client'

import type { AuthState, AuthStoreData } from '../interfaces/store'

const INITIAL_STATE: AuthState = {
  user: null,
  accessToken: null,
}

export const useAuthStore = create<AuthStoreData>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setAuth: (user, token) => {
        const accessToken = token ?? null

        set({ user, accessToken })
      },

      refreshAuth: (token) => {
        const accessToken = token ?? get().accessToken

        set({ accessToken })
      },

      logout: () => {
        if (!get().user) return
        set(INITIAL_STATE)
        queryClient.cancelQueries()
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
      }),
    }
  )
)

export type AuthStore = typeof useAuthStore
export type AuthStoreState = ReturnType<AuthStore['getState']>
