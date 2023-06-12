import { defineComponent, h, ref } from 'vue-demi'
import { encodeLoginParams, setAuthToken, transformVNodeProps } from '../utils'

export const LoginArea: Object = defineComponent({
  setup(_, { emit }) {
    const account = ref('')
    const password = ref('')

    const handleAccountInput = (e: InputEvent) => {
      account.value = (e.target as HTMLInputElement).value
    }

    const handlePasswordInput = (e: InputEvent) => {
      password.value = (e.target as HTMLInputElement).value
    }

    const handleLogin = () => {
      return fetch(`/api/admin/account/login_key?params=${Math.random()}`)
        .then(res => res.json())
        .then((result) => {
          const key = result.data.publicKey
          const cryptogram = encodeLoginParams(key, [account.value, password.value])
          fetch('/api/admin/account/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mode: 'Password', key, cryptogram }),
            credentials: 'omit',
          })
            .then(res => res.json())
            .then((result) => {
              const tokens = {
                token: result.data.accessToken,
                refreshToken: result.data.refreshToken,
                xAccessToken: result.data['X-Access-Token'],
              }
              setAuthToken(tokens)
              emit('afterLogin')
            })
        })
    }

    return {
      handleAccountInput,
      handlePasswordInput,
      handleLogin,
      account,
      password,
    }
  },
  render() {
    return h(
      'div',
      { class: 'dev-login-form__container' },
      [
        h('input', transformVNodeProps({ onInput: this.handleAccountInput, placeholder: '请输入账号' })),
        h('input', transformVNodeProps({ onInput: this.handlePasswordInput, type: 'password', placeholder: '请输入密码' })),
        h('button', transformVNodeProps({ onClick: this.handleLogin }), '登录'),
      ])
  },
})
