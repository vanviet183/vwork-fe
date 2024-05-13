import { AlertType } from '~/constants'
import { Project } from '~/models/class/common/project'
import type { User } from '~/models/class/common/user'
import { CreateListUserRequest } from '~/models/class/user/create-list-user/create-list-user-request'
import { CreateUserRequest } from '~/models/class/user/create-user/create-user-request'
import { DeleteUserRequest } from '~/models/class/user/delete-user/delete-user-request'
import { GetAllProjectUserJoinRequest } from '~/models/class/user/get-all-project-user-join/get-all-project-user-join-request'

import { GetUserInfoRequest } from '~/models/class/user/get-user-info/get-user-info-request'
import type { GetUserInfoResponse } from '~/models/class/user/get-user-info/get-user-info-response'
import { UpdateUserRequest } from '~/models/class/user/update-user/update-user-request'
import {
  createListUserApi,
  createUserApi,
  deleteUserApi,
  getAllProjectsUserJoinApi,
  getAllUserApi,
  getUserInfoApi,
  updateUserApi,
} from '~/services/user/user-service'
import { useAlertStore } from '~/stores/alert/alert-store'

export const useUserStore = defineStore('user', () => {
  const alertStore = useAlertStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')
  const userInfo = ref<GetUserInfoResponse>()
  const adminInfo = ref<GetUserInfoResponse>()

  const listAllUser = ref<User[]>()

  const listProjectOfUser = ref<Project[]>([])

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

  async function getAllUser() {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const response = await getAllUserApi()
      listAllUser.value = response.contents?.listUser
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function getAllProjectsUserJoin(userId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetAllProjectUserJoinRequest(userId)

      const response = await getAllProjectsUserJoinApi(request)
      listProjectOfUser.value = response.contents?.listProject ?? []
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
    sector: string,
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
        sector,
        role
      )
      const response = await createUserApi(request)
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

  async function updateUser(
    userId: number,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    sector: string,
    role: string,
    organizationId?: number
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new UpdateUserRequest(
        userId,
        firstName,
        lastName,
        phone,
        email,
        password,
        sector,
        role,
        organizationId
      )
      const response = await updateUserApi(request)
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

  async function deleteUser(userId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new DeleteUserRequest(userId)
      const response = await deleteUserApi(request)
      if (response.message) {
        alertStore.setAlertMessage({
          message: response.message,
          type: AlertType.success,
        })
      }
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function createListUser(file: File) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new CreateListUserRequest(file)
      const response = await createListUserApi(request)
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
    userInfo,
    adminInfo,
    listAllUser,
    listProjectOfUser,
    getAllProjectsUserJoin,
    getUserInfo,
    deleteUser,
    createUser,
    updateUser,
    createListUser,
    getAllUser,
    updateUserApi,
  }
})
