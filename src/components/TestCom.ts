import { defineComponent, h, onMounted, ref } from 'vue-demi'

// unknown bug
import type { DefineComponent } from 'vue-demi'

export const SimulateLoginPlugin: DefineComponent = defineComponent({
  props: {
    content: {
      type: String,
    },
  },
  setup(props, { slots }) {
    const count = ref(1)

    const handleClick = () => {
      count.value++
      console.log('clickOnce')
    }

    onMounted(() => console.log('onMounted'))

    return {
      handleClick,
      count,
      slots,
      props,
    }
  },
  render() {
    console.log(this.slots)
    const group = []
    for (let i = 0; i < this.count; i++) {
      group.push(h('div', [
        h('span', {}, this.slots.default ? this.slots.default() : this.props.content),
      ]))
    }

    return h('div', { onClick: this.handleClick }, group)
  },
})
