import { defineComponent, h, onMounted, ref } from 'vue-demi'
import { transformVNodeProps } from '../utils'
import { Dialog } from './Dialog'

export const Trigger: Object = defineComponent({
  name: 'Trigger',
  setup(props, { slots }) {
    const dialogRef = ref<HTMLDialogElement | null>(null)

    onMounted(() => {
      dialogRef.value = document.getElementsByClassName('dev-login-dialog')[0] as HTMLDialogElement
    })

    const showDialog = () => {
      dialogRef.value!.showModal()
    }

    const closeDialog = () => {
      dialogRef.value!.close()
    }

    return {
      slots,
      props,
      showDialog,
      closeDialog,
    }
  },
  render() {
    return h('div', null,
      [
        h(
          'button',
          transformVNodeProps({ class: 'dev-login-button', onClick: this.showDialog }),
          'showDialog',
        ),
        h(
          Dialog,
          transformVNodeProps({ onClose: this.closeDialog }),
        ),
      ])
  },
})
