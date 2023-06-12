import { defineComponent, h, ref } from 'vue-demi'
import { getAuthToken, transformVNodeProps } from '../utils'
import type { UserModal } from '../types'

export const SearchArea: Object = defineComponent({
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
          'Authentication': token as string,
          'X-Access-Token': xAccessToken as string,
        },
        credentials: 'omit',
      })
        .then(res => res.json())
        .then((result) => {
          emit('search', result.data as UserModal[])
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
        h('input', transformVNodeProps({ onInput: this.handleInput, placeholder: '请输入关键字', class: 'dev-login-input' })),
        h('button', transformVNodeProps({ onClick: this.handleSearch, class: 'dev-login-button' }), '查询'),
      ])
  },
})
