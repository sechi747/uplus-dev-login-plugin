import { defineComponent, h } from 'vue-demi'
import type { VNode } from 'vue-demi'
import type { UserModal } from '../types'

export const UsersArea: Object = defineComponent({
  props: {
    userList: {
      type: Array<UserModal>,
      default: () => [],
    },
  },

  setup(props, { slots }) {
    return {
      slots,
      props,
    }
  },
  render() {
    const group: VNode[] = []
    this.props.userList.forEach((user) => {
      group.push(
        h('div', { class: 'dev-users-area__item' },
          [
            h('span', null, `${user.account} || ${user.name}`),
            h('button', null, '模拟登录'),
          ],
        ))
    })
    return h('div', { class: 'dev-users-area__container' },
      group,
    )
  },
})
