import type { AuthTokens } from '../types'

export const AUTH_TOKEN_KEYS: Array<keyof AuthTokens> = ['accessToken', 'refreshToken']

export const ATTR_NAMES = ['src', 'type', 'id', 'placeholder']

export const ADMIN_GATEWAY = {
  tev: 'https://tev-admin.qstcloud.net',
  uea: 'https://uea-admin.qstcloud.net',
  ueb: 'https://ueb-admin.qstcloud.net',
  prod: 'https://admin-u.eduplus.net',
}
