import { RouterProvider } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { router } from './router'

export function App() {
  const { user, accessToken, logout } = useAuthStore()
  return (
    <RouterProvider
      router={router}
      context={{
        auth: { user, accessToken, logout },
      }}
    />
  )
}
