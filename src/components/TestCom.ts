import { defineComponent, h, onMounted, ref } from 'vue-demi'
import { getAuthToken } from '../utils'
import type { UserModal } from '../types'
import { LoginArea } from './LoginArea'
import { SearchArea } from './SearchArea'
import { UsersArea } from './UsersArea'

export const SimulateLoginPlugin: Object = defineComponent({
  props: {
  },
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
      group.push(h(LoginArea, { onAfterLogin: this.hideLoginArea }))
    }
    else {
      group.push(h('div', { class: 'dev-search-area__container' },
        [
          h(SearchArea, { onSearch: this.setUserList }),
          h(UsersArea, { userList: this.userList }),
        ],
      ))
    }

    return h('div', null, group)
  },
})
