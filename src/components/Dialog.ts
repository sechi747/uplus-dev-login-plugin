import { defineComponent, h } from 'vue-demi'
import { transformVNodeProps } from '../utils'
import { SimulateLoginPlugin } from './Container'

export const Dialog: Object = defineComponent({
  setup(props, { slots, emit }) {
    const handleClose = () => {
      emit('close')
    }

    return {
      slots,
      props,
      handleClose,
    }
  },
  render() {
    return h(
      'dialog',
      transformVNodeProps({ class: 'dev-login-dialog' }),
      [
        h('div', { class: 'dev-login-dialog__header' },
          h('span', transformVNodeProps({ onClick: this.handleClose, style: { cursor: 'pointer' } }), '✖'),
        ),
        h(SimulateLoginPlugin),
      ],
    )
  },
})
