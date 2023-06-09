import Jsencrypt from 'jsencrypt'
import { AUTH_TOKEN_KEYS } from '../const'
import type { AuthTokens } from '../types'

/**
 * 登录参数加密
 */
export function encodeLoginParams(key: string, params: [string, string]) {
  const crypter = new Jsencrypt()
  crypter.setPublicKey(key)
  return crypter.encrypt(params.join('|'))
}

export function setAuthToken(tokens: AuthTokens) {
  AUTH_TOKEN_KEYS.forEach((key) => {
    localStorage.setItem(`dev-login-${key}`, tokens[key] as string)
  })
}

export function getAuthToken() {
  const tokens = {} as AuthTokens
  AUTH_TOKEN_KEYS.forEach((key) => {
    tokens[key] = localStorage.getItem(`dev-login-${key}`)
  })
  return tokens
}
