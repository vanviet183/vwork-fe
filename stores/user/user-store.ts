import { GetUserRequest } from 'models/class/user/get-user-request'
import { GetUserResponse } from 'models/class/user/get-user-response'
import { AlertType } from '~/constants'
import {
  getListUserApi,
  updateMailReceiveSettingApi,
} from '~/services/user/user-service'
import { useAlertStore } from '~/stores/alert/alert-store'

export const useUserStore = defineStore('user', () => {
  const alertStore = useAlertStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')
  const listUser = ref<GetUserResponse>()

  async function getListUser(userId: string, email: string) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const getListUserRequest = new GetUserRequest(userId, email)
      const response = await getListUserApi(getListUserRequest.instance)
      listUser.value = response.contents
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function updateMailReceiveSetting(userId: string, email: string) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const requestUpdateMailReceiveSetting = new GetUserRequest(userId, email)
      const response = await updateMailReceiveSettingApi(
        requestUpdateMailReceiveSetting.instance
      )
      if (response.message) {
        alertStore.setAlertMessage({
          message: response.message,
          type: AlertType.success,
        })
      }
      return true
    } catch (error) {
      isError.value = true
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    isError,
    error,
    listUser,
    getListUser,
    updateMailReceiveSetting,
  }
})
