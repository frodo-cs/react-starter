import { RouterProvider } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { router } from './router'

export function App() {
  const auth = useAuthStore()

  return (
    <RouterProvider
      router={router}
      context={{
        auth,
      }}
    />
  )
}
