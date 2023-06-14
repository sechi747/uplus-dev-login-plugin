import { defineComponent, h, onMounted, provide, ref } from 'vue-demi'
import { transformVNodeProps } from '../utils'
import { Dialog } from './Dialog'
import { SimulateLoginPlugin } from './Container'

export const Trigger: Object = defineComponent({
  name: 'Trigger',
  props: {
    basePath: {
      type: String,
      default: '/',
    },
  },
  setup(props, { slots }) {
    const mainRef = ref<HTMLDialogElement | null>(null)
    const confirmRef = ref<HTMLDialogElement | null>(null)
    const hideTrigger = ref(false)

    provide('basePath', props.basePath)

    onMounted(() => {
      mainRef.value = document.getElementById('dev-main-modal') as HTMLDialogElement
      confirmRef.value = document.getElementById('dev-confirm-modal') as HTMLDialogElement
      hideTrigger.value = Boolean(window.sessionStorage.getItem('dev-login-hide-trigger'))
    })

    const showMainDialog = () => {
      mainRef.value!.showModal()
    }

    const showConfirmDialog = () => {
      confirmRef.value!.showModal()
    }

    const closeMainDialog = () => {
      mainRef.value!.close()
    }

    const closeConfirmDialog = () => {
      confirmRef.value!.close()
    }

    const handleCancel = () => {
      closeConfirmDialog()
      closeMainDialog()
    }

    const handleConfirm = () => {
      window.sessionStorage.setItem('dev-login-hide-trigger', 'true')
      hideTrigger.value = true
      handleCancel()
    }

    return {
      slots,
      props,
      hideTrigger,
      showMainDialog,
      showConfirmDialog,
      closeMainDialog,
      closeConfirmDialog,
      handleConfirm,
      handleCancel,
    }
  },
  render() {
    if (this.hideTrigger)
      return null
    return h('div', null,
      [
        h(
          'div',
          transformVNodeProps({ class: 'dev-login-trigger', onClick: this.showMainDialog }),
          [h('div', { class: 'dev-login-profile-icon' })],
        ),
        h(
          Dialog,
          transformVNodeProps({ id: 'dev-main-modal', onClose: this.showConfirmDialog }, { showFooterButtons: false }),
          [h(SimulateLoginPlugin)],
        ),
        h(
          Dialog,
          transformVNodeProps({ id: 'dev-confirm-modal', onClose: this.closeConfirmDialog, onConfirm: this.handleConfirm, onCancel: this.handleCancel }),
          [h('span', '是否在本次会话中暂时移除Trigger?')],
        ),
      ])
  },
})
