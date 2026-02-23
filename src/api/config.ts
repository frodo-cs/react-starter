import type { IAuthAdapter } from '@/features/auth/adapters/auth-base.adapter'
import { AuthAdapterMock } from '@/features/auth/adapters/auth-mock.adapter'

const IS_MOCK = import.meta.env.MODE === 'mock'
const API_BASE_URL = IS_MOCK ? '' : import.meta.env.VITE_API_BASE_URL || ''

/**
 * Global Adapter Registry.
 *
 * Maps environment configurations to their respective adapter implementations.
 * This pattern allows the UI to remain entirely ignorant of the backend (e.g.,
 * switching between a 'mock' environment for local development and a 'rest'
 * environment for production without changing any component logic).
 */
const ADAPTERS = {
  mock: {
    auth: AuthAdapterMock,
  },
}

type AdapterVersion = keyof typeof ADAPTERS

function getAdapterVersion() {
  const version = (import.meta.env.VITE_ENVIRONMENT || 'mock') as AdapterVersion
  return ADAPTERS[version]
}

function createAuthAdapter(): IAuthAdapter {
  const adapterVersion = getAdapterVersion()
  const AdapterClass = adapterVersion.auth
  return new AdapterClass(API_BASE_URL)
}

export const authAdapter = createAuthAdapter()
