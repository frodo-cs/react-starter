import type { IAuthAdapter } from '@/features/auth/adapters/auth-base.adapter'
import { AuthAdapterMock } from '@/features/auth/adapters/auth-mock.adapter'

const IS_MOCK = import.meta.env.MODE === 'mock'
const API_BASE_URL = IS_MOCK
  ? ''
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (import.meta as any).env.VITE_API_BASE_URL || ''

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
  development: {
    // placeholder
    auth: AuthAdapterMock,
  },
  production: {
    // placeholder
    auth: AuthAdapterMock,
  },
} as const

type AdapterMode = keyof typeof ADAPTERS

/**
 * Retrieves the adapter configuration for the current environment mode.
 */
function getAdapterConfig() {
  const mode = import.meta.env.MODE as AdapterMode
  return ADAPTERS[mode] || ADAPTERS.mock
}

/**
 * Factory function to create the authentication adapter.
 */
function createAuthAdapter(): IAuthAdapter {
  const config = getAdapterConfig()
  const AdapterClass = config.auth
  return new AdapterClass(API_BASE_URL)
}

/**
 * Exported singleton instance of the authentication adapter.
 */
export const authAdapter = createAuthAdapter()
