import { defineComponent, h, ref } from 'vue-demi'
import { getAuthToken, transformVNodeProps } from '../utils'
import type { UserModal } from '../types'

export const SearchArea: Object = defineComponent({
  setup(props, { slots, emit }) {
    const { accessToken } = getAuthToken()
    const keyword = ref('')

    const handleInput = (e: InputEvent) => {
      keyword.value = (e.target as HTMLInputElement).value
    }

    const handleSearch = () => {
      return fetch(`/api/admin/v1/members?pageSize=50&pageNumber=1&multiSearchParam=${keyword.value}`, {
        method: 'GET',
        headers: {
          Authentication: accessToken as string,
        },
        credentials: 'omit',
      })
        .then(res => res.json())
        .then((result) => {
          if (!result.success && result.status !== 200)
            emit('authExp')
          else
            emit('search', result.data as UserModal[])
        })
        .catch(() => emit('authExp'))
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
