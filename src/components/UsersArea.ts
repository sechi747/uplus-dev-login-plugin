import { defineComponent, h } from 'vue-demi'

// unknown bug
import type { DefineComponent } from 'vue-demi'

export const UsersArea: DefineComponent = defineComponent({
  props: {
    userList: {
      type: Array,
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
    const group = []
    this.props.userList.forEach((user) => {
      group.push(h('div', {class: 'dev-users-area__item'},
        [
          h('span', null, `${user.account} || ${user.name}`),
          h('button', null, '模拟登录'),
        ],
      ))
    })
    return h('div', { class: 'dev-users-area__container' },
      null,
      group,
    )
  },
})
