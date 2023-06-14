import { defineComponent, h, onMounted, ref } from 'vue-demi'
import { clearAuthToken, getAuthToken, transformVNodeProps } from '../utils'
import type { UserModal } from '../types'
import { LoginArea } from './LoginArea'
import { SearchArea } from './SearchArea'
import { UsersArea } from './UsersArea'

export const SimulateLoginPlugin: Object = defineComponent({
  name: 'SimulateLoginPlugin',
  setup(props, { slots }) {
    const { accessToken } = getAuthToken()

    const showLoginArea = ref(true)
    const userList = ref<UserModal[]>([])

    const reLogin = () => {
      clearAuthToken()
      showLoginArea.value = true
    }

    const hideLoginArea = () => {
      showLoginArea.value = false
    }

    const setUserList = (val: UserModal[]) => {
      userList.value = val
    }

    onMounted(() => {
      if (typeof accessToken === 'string')
        hideLoginArea()
    })

    return {
      slots,
      props,
      showLoginArea,
      userList,
      hideLoginArea,
      setUserList,
      reLogin,
    }
  },
  render() {
    const group = []
    if (this.showLoginArea) {
      group.push(
        h(LoginArea, transformVNodeProps({ onLoginSuccess: this.hideLoginArea })),
      )
    }
    else {
      group.push(
        h(SearchArea, transformVNodeProps({ onSearch: this.setUserList, onAuthExp: this.reLogin })),
        h(UsersArea, transformVNodeProps({}, { userList: this.userList })),
      )
    }

    return h('div', { class: 'dev-search-area__container' }, group)
  },
})
