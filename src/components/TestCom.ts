import { defineComponent, h, onMounted, ref } from 'vue-demi'

// unknown bug
import type { DefineComponent } from 'vue-demi'
import { getAuthToken } from '../utils'
import { LoginArea } from './LoginArea'
import { SearchArea } from './SearchArea'

export const SimulateLoginPlugin: DefineComponent = defineComponent({
  props: {
  },
  setup(props, { slots }) {
    const { xAccessToken } = getAuthToken()

    const showLoginArea = ref(true)

    const hideLoginArea = () => {
      showLoginArea.value = false
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
      hideLoginArea,
    }
  },
  render() {
    const group = []
    if (this.showLoginArea)
      group.push(h(LoginArea, { onAfterLogin: this.hideLoginArea }))
    else
      group.push(h('div', { class: 'dev-search-area__container' }, h(SearchArea)))

    return h('div', null, group)
  },
})
