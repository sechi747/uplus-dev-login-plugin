import Jsencrypt from 'jsencrypt'
import { isVue2 } from 'vue-demi'
import { ATTR_NAMES, AUTH_TOKEN_KEYS } from '../const'
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

export function transformVNodeProps(properties: Record<string, any>, propsObj?: Record<string, any>) {
  if (!isVue2)
    return { ...properties, ...propsObj }
  const on: Record<string, any> = {}
  const attrs: Record<string, string> = {}
  const props: Record<string, any> = {}

  Object.keys(properties)
    .filter(event => /^on[A-Z]/.test(event))
    .forEach((event) => {
      const eventName = event[2].toLowerCase() + event.substring(3)
      on[eventName] = properties[event]
    })
  properties.on = Object.assign({}, on, properties.on || {})

  ATTR_NAMES
    .filter(name => properties[name] !== undefined)
    .forEach((name) => {
      attrs[name] = properties[name]
    })
  properties.attrs = Object.assign({}, attrs, properties.attrs || {})

  if (propsObj !== undefined) {
    Object.keys(propsObj).forEach((key) => {
      props[key] = propsObj[key]
    })
    properties.props = Object.assign({}, props, propsObj || {})
  }

  return properties
}

export function transformVNodeSlots(slots: Record<string, any>, name = 'default') {
  if (!isVue2)
    return slots[name]()
  else
    return slots[name]
}
