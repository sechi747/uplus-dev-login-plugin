import Jsencrypt from 'jsencrypt'

/**
 * 登录参数加密
 */
export function encodeLoginParams(key: string, params: [string, string]) {
  const crypter = new Jsencrypt()
  crypter.setPublicKey(key)
  return crypter.encrypt(params.join('|'))
}
