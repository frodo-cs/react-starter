type BoolLike = boolean | string | undefined

/**
 * Parses an environment variable value into a boolean.
 * Accepts actual booleans or the string literals 'true' / 'false'.
 */
function parseBool(v: BoolLike, fallback = false) {
  if (typeof v === 'boolean') return v
  if (typeof v === 'string') return v === 'true'
  return fallback
}

export type AppConfig = {
  /** The scheme used in the Authorization header, e.g. 'Bearer'. */
  tokenScheme: string
  auth: {
    /** When true, users must pass an email gate before registering. */
    emailGate: boolean
    /** When true, newly registered users must verify their email before signing in. */
    accountVerify: boolean
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const env = (import.meta as any).env as Record<
  string,
  string | boolean | undefined
>

export const appConfig: AppConfig = {
  tokenScheme: String(env.VITE_TOKEN_SCHEME ?? 'Bearer'),
  auth: {
    emailGate: parseBool(env.VITE_EMAIL_GATE, true),
    accountVerify: parseBool(env.VITE_ACCOUNT_VERIFY, true),
  },
}

export default appConfig
