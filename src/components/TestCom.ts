import { defineComponent, h, onMounted, ref } from 'vue-demi'
import { getAuthToken, transformVNodeProps } from '../utils'
import type { UserModal } from '../types'
import { LoginArea } from './LoginArea'
import { SearchArea } from './SearchArea'
import { UsersArea } from './UsersArea'

export const SimulateLoginPlugin: Object = defineComponent({
  name: 'SimulateLoginPlugin',
  setup(props, { slots }) {
    const { xAccessToken } = getAuthToken()

    const showLoginArea = ref(true)
    const userList = ref<UserModal[]>([])

    const hideLoginArea = () => {
      showLoginArea.value = false
    }

    const setUserList = (val: UserModal[]) => {
      userList.value = val
    }

    onMounted(() => {
      console.log('')
      if (typeof xAccessToken === 'string')
        hideLoginArea()
    })

    return {
      slots,
      props,
      showLoginArea,
      userList,
      hideLoginArea,
      setUserList,
    }
  },
  render() {
    const group = []
    if (this.showLoginArea) {
      group.push(h(LoginArea, transformVNodeProps({ onAfterLogin: this.hideLoginArea })))
    }
    else {
      group.push(h('div', { class: 'dev-search-area__container' },
        [
          h(SearchArea, transformVNodeProps({ onSearch: this.setUserList })),
          h(UsersArea, transformVNodeProps({}, { userList: this.userList })),
        ],
      ))
    }

    return h('div', null, group)
  },
})
