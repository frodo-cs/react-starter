import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function failSilently() {
  // fail silently
}

/**
 * Safely parses the API timeout environment variable.
 * Fallbacks to a default 30-second timeout if the value is missing or invalid.
 *
 * @returns The computed timeout duration in milliseconds.
 */
export function getApiTimeout(): number {
  const raw = import.meta.env.VITE_API_TIMEOUT
  const timeout = Number(raw)
  return (Number.isFinite(timeout) && timeout > 0 ? timeout : 30) * 1000
}
