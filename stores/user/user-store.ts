import { CreateListUserRequest } from '~/models/class/user/create-list-user/create-list-user-request'
import { CreateUserRequest } from '~/models/class/user/create-user/create-user-request'

import { GetUserInfoRequest } from '~/models/class/user/get-user-info/get-user-info-request'
import type { GetUserInfoResponse } from '~/models/class/user/get-user-info/get-user-info-response'
import {
  createListUserApi,
  createUserApi,
  getUserInfoApi,
} from '~/services/user/user-service'
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

  async function createUser(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    groupId: number,
    role: string
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new CreateUserRequest(
        firstName,
        lastName,
        phone,
        email,
        password,
        groupId,
        role
      )
      await createUserApi(request)
      return true
    } catch (error) {
      isError.value = true
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function createListUser(organizationId: number, file: File) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new CreateListUserRequest(organizationId, file)
      await createListUserApi(request)
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
    userInfo,
    getUserInfo,
    createUser,
    createListUser,
  }
})
