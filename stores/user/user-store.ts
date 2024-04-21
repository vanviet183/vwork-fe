import { GetUserInfoRequest } from '~/models/class/user/get-user-info-request'
import { GetUserInfoResponse } from '~/models/class/user/get-user-info-response'
import { getUserInfoApi } from '~/services/user/user-service'
import { useAlertStore } from '~/stores/alert/alert-store'

export const useUserStore = defineStore('user', () => {
  const alertStore = useAlertStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')
  const userInfo = ref<GetUserInfoResponse>()

  async function getUserInfo(userId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetUserInfoRequest(userId)
      const response = await getUserInfoApi(request)
      userInfo.value = response.contents
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    isError,
    error,
    userInfo,
    getUserInfo,
  }
})
