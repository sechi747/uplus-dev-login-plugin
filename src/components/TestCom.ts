import { defineComponent, h, onMounted, ref } from 'vue-demi'

// unknown bug
import type { DefineComponent } from 'vue-demi'
import { getAuthToken } from '../utils'
import { LoginArea } from './LoginArea'
import { SearchArea } from './SearchArea'
import { UsersArea } from './UsersArea'

export const SimulateLoginPlugin: DefineComponent = defineComponent({
  props: {
  },
  setup(props, { slots }) {
    const { xAccessToken } = getAuthToken()

    const showLoginArea = ref(true)
    const userList = ref([])

    const hideLoginArea = () => {
      showLoginArea.value = false
    }

    const setUserList = (val: any) => {
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
