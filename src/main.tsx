import './styles/index.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app.tsx'
import { queryClient } from './query-client.ts'

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

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

const root = createRoot(rootElement)
enableMocking().then(() => {
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  )
})
