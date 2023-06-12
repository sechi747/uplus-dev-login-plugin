import { defineComponent, h } from 'vue-demi'
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
    const { token, xAccessToken } = getAuthToken()

    // 模拟登录前先使用真实memberId获取一个mock memberId
    const getMockMemberId = (memberId: string) => {
      return fetch(`/api/auth/session/simulation_login/before?memberId=${memberId}`, {
        method: 'GET',
        headers: {
          'Authentication': token as string,
          'X-Access-Token': xAccessToken as string,
        },
        credentials: 'omit',
      })
        .then(res => res.json())
        .then(result => result.data.memberId)
    }

    const simulateLogin = async (user: UserModal) => {
      const mockMemberId = await getMockMemberId(user.id)
      window.open(`/simulatedLoginBridge?memberId=${mockMemberId}`)
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
