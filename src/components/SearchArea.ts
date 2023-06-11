import { defineComponent, h, ref } from 'vue-demi'

// unknown bug
import type { DefineComponent } from 'vue-demi'
import { getAuthToken } from '../utils'

export const SearchArea: DefineComponent = defineComponent({
  setup(props, { slots, emit }) {
    const { token, xAccessToken } = getAuthToken()
    const keyword = ref('')

    const handleInput = (e: InputEvent) => {
      keyword.value = (e.target as HTMLInputElement).value
    }

    const handleSearch = () => {
      return fetch(`/api/admin/v1/members?pageSize=50&pageNumber=1&multiSearchParam=${keyword.value}`, {
        method: 'GET',
        headers: {
          'Authentication': token,
          'X-Access-Token': xAccessToken,
        },
        credentials: 'omit',
      })
        .then(res => res.json())
        .then((result) => {
          emit('search', result.data)
        })
    }

    return {
      handleInput,
      handleSearch,
      slots,
      props,
    }
  },
  render() {
    return h('div', { class: 'dev-search-area__header' },
      [
        h('input', { onInput: this.handleInput, placeholder: '请输入关键字' }),
        h('button', { onClick: this.handleSearch }, '查询'),
      ])
  },
})
