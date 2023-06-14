import { defineComponent, h } from 'vue-demi'
import { transformVNodeProps, transformVNodeSlots } from '../utils'

export const Dialog: Object = defineComponent({
  props: {
    showFooterButtons: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots, emit }) {
    const handleClose = () => {
      emit('close')
    }

    const handleCancel = () => {
      emit('cancel')
    }

    const handleConfirm = () => {
      emit('confirm')
    }

    return {
      slots,
      props,
      handleClose,
      handleCancel,
      handleConfirm,
    }
  },
  render() {
    return h(
      'dialog',
      transformVNodeProps({ class: 'dev-login-dialog' }),
      [
        h('div', { class: 'dev-login-dialog__header' },
          [h('div', transformVNodeProps({ onClick: this.handleClose, class: 'dev-login-close-icon', style: { cursor: 'pointer' } }))],
        ),
        [
          transformVNodeSlots(this.slots),
          this.props.showFooterButtons
            ? h('div',
              transformVNodeProps({ class: 'dev-login-dialog__footer' }),
              [
                h('button',
                  transformVNodeProps({ class: 'dev-login-button', onClick: this.handleCancel }),
                  '否',
                ),
                h('button',
                  transformVNodeProps({ class: 'dev-login-button', onClick: this.handleConfirm }),
                  '是',
                ),
              ],
            )
            : '',
        ],
      ],
    )
  },
})
