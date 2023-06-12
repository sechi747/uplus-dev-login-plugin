import type { AuthTokens } from '../types'

export const AUTH_TOKEN_KEYS: Array<keyof AuthTokens> = ['token', 'refreshToken', 'xAccessToken']

export const ATTR_NAMES = ['src', 'type', 'id', 'placeholder']
