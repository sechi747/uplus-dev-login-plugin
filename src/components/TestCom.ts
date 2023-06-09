import { defineComponent, h, onMounted, ref } from 'vue-demi'

// unknown bug
import type { DefineComponent } from 'vue-demi'
import { getAuthToken } from '../utils'
import { LoginArea } from './LoginArea'

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
      group.push(h('div', null, 'Hello'))

    return h('div', null, group)
  },
})
