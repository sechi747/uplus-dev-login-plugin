import { defineComponent, h, inject } from 'vue-demi'
import type { VNode } from 'vue-demi'
import type { UserModal } from '../types'
import { getAuthToken, transformVNodeProps } from '../utils'

export const UsersArea: Object = defineComponent({
  props: {
    userList: {
      type: Array<UserModal>,
      default: () => [],
    },
  },

  setup(props, { slots }) {
    const { accessToken } = getAuthToken()

    const basePath = inject('basePath')

    // 模拟登录前先使用真实memberId获取一个mock memberId
    const getMockMemberId = (memberId: string) => {
      return fetch('/api/auth/login/checkup', {
        method: 'POST',
        headers: {
          'Authentication': accessToken as string,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mode: 'Imitate', memberId }),
        credentials: 'omit',
      })
        .then(res => res.json())
        .then(result => result.data.unrealMemberId)
    }

    const simulateLogin = async (user: UserModal) => {
      const mockMemberId = await getMockMemberId(user.id)
      window.location.href = (`${window.location.origin}${basePath}simulatedLoginBridge?memberId=${mockMemberId}`)
    }

    return {
      slots,
      props,
      simulateLogin,
    }
  },
  render() {
    const group: VNode[] = []
    this.props.userList.forEach((user) => {
      group.push(
        h('div', { class: 'dev-users-area__item' },
          [
            h('span', null, `${user.account} || ${user.name}`),
            h('button', transformVNodeProps({ onClick: () => this.simulateLogin(user), class: 'dev-login-button' }), '模拟登录'),
          ],
        ))
    })
    return h('div', { class: 'dev-users-area__container' },
      group,
    )
  },
})
