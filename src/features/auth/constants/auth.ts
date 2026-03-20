export const AUTH_ERRORS = {
  USER_NOT_FOUND: 'userNotFound',
  EMAIL_ALREADY_IN_USE: 'emailAlreadyInUse',
  INCORRECT_CREDENTIALS: 'incorrectCredentials',
  LIMIT_EXCEEDED: 'limitExceeded',
  PASSWORD_REQUIREMENTS: 'passwordRequirements',
  INVALID_PARAMETERS: 'invalidParameters',
  SIGN_IN_ERROR: 'signInError',
  SIGN_UP_ERROR: 'signUpError',
  RESET_REQUEST_ERROR: 'resetRequestError',
  RESET_CONFIRM_ERROR: 'resetConfirmError',
  TOKEN_UNAVAILABLE: 'tokenUnavailable',
  REFRESH_TOKEN_UNAVAILABLE: 'refreshTokenUnavailable',
  REFRESH_FAILED: 'refreshFailed',
  SESSION_EXPIRED_ERROR: 'sessionExpired',
  INVALID_TOKEN: 'invalidToken',
} as const

export type AuthError = (typeof AUTH_ERRORS)[keyof typeof AUTH_ERRORS]
