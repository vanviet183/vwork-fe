import dayjs from 'dayjs'
import { AlertType, ERR_MESSAGE } from '~/constants'
import { AlertMessage } from '~/models/interface/common/alert'

export const useAlertStore = defineStore('alert', () => {
  const alertMessage = ref<AlertMessage>()

  function setAlertMessage(message: AlertMessage) {
    const id = dayjs().format('YYYYMMDDHHmmssSSS')
    alertMessage.value = { ...message, id }
  }

  function resetAlertMessage() {
    alertMessage.value = undefined
  }

  return {
    alertMessage,
    setAlertMessage,
    resetAlertMessage,
  }
})

export const setSystemErrorAlertMessage = () => {
  const alertStore = useAlertStore()
  const errorMessage: AlertMessage = {
    message: ERR_MESSAGE.ERR_SYS_ERROR,
    type: AlertType.error,
  }
  alertStore.setAlertMessage(errorMessage)
}
