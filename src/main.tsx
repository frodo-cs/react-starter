import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import './styles/index.css'
import { queryClient } from './query-client.ts'
import { App } from './app.tsx'

async function enableMocking() {
  if (import.meta.env.MODE !== 'mock') {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations()
      for (const registration of registrations) {
        if (registration.active?.scriptURL.includes('mockServiceWorker.js')) {
          await registration.unregister()
        }
      }
    }
    return
  }

  const { worker } = await import('./mocks/browser')
  return worker.start()
}

const root = createRoot(document.getElementById('root')!)
enableMocking().then(() => {
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  )
})
