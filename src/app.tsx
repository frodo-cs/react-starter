import { RouterProvider } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { router } from './router'

export function App() {
  return (
    <RouterProvider
      router={router}
      context={{
        auth: useAuthStore,
      }}
    />
  )
}
