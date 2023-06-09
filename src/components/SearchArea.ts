import { defineComponent, h, ref } from 'vue-demi'

// unknown bug
import type { DefineComponent } from 'vue-demi'

export const SearchArea: DefineComponent = defineComponent({
  setup(props, { slots }) {
    const keyword = ref('')

    const handleInput = (e: InputEvent) => {
      keyword.value = (e.target as HTMLInputElement).value
    }

    const handleSearch = () => {
      console.log('search:::', keyword.value)
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
