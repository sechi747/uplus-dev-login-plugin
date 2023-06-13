import { defineComponent, h, onMounted, ref } from 'vue-demi'
import { transformVNodeProps } from '../utils'
import { Dialog } from './Dialog'
import { SimulateLoginPlugin } from './Container'

export const Trigger: Object = defineComponent({
  name: 'Trigger',
  setup(props, { slots }) {
    const dialogRef = ref<HTMLDialogElement | null>(null)

    onMounted(() => {
      dialogRef.value = document.getElementsByClassName('dev-login-dialog')[0] as HTMLDialogElement
    })

    const showDialog = () => {
      console.log('aaaaaaa', dialogRef.value)

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
          'div',
          transformVNodeProps({ class: 'dev-login-trigger', onClick: this.showDialog }),
          [h('div', { class: 'dev-login-profile-icon' })],
        ),
        h(
          Dialog,
          transformVNodeProps({ onClose: this.closeDialog }),
          [h(SimulateLoginPlugin)],
        ),
      ])
  },
})
