import { User } from '~/models/class/common/user'
import { GetAllUserInOrganizationRequest } from '~/models/class/oranizations/get-all-user-in-organization/get-all-user-in-organization-request'
import { InitOrganizationRequest } from '~/models/class/oranizations/init/init-organization-request'
import { InitOrganizationResponse } from '~/models/class/oranizations/init/init-organization-response'
import { JoinOrganizationRequest } from '~/models/class/oranizations/join/join-organization-request'
import {
  getAllUserInOrganizationApi,
  initOrganizationApi,
  joinOrganizationApi,
} from '~/services/organization/organization-service'
import { useAlertStore } from '../alert/alert-store'

export const useOrganizationStore = defineStore('organization', () => {
  const alertStore = useAlertStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  const organizationInfo = ref<InitOrganizationResponse>()
  const listUser = ref<User[]>()

  async function initOrganization(
    userId: number,
    organizationName: string,
    email: string,
    phone: string,
    role: string
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const initOrganiztionRequest = new InitOrganizationRequest(
        userId,
        organizationName,
        email,
        phone,
        role
      )
      const response = await initOrganizationApi(initOrganiztionRequest)
      organizationInfo.value = response.contents
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function joinOrganization(userId: number, organizationId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const joinOrganiztionRequest = new JoinOrganizationRequest(
        userId,
        organizationId
      )
      const response = await joinOrganizationApi(joinOrganiztionRequest)
      if (response.contents) {
        organizationInfo.value = response.contents
        return true
      }
    } catch (error) {
      isError.value = true
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function getAllUserInOrganization(organizationId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetAllUserInOrganizationRequest(organizationId)
      const response = await getAllUserInOrganizationApi(request)
      listUser.value = response.contents.listUser
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
    organizationInfo,
    listUser,
    initOrganization,
    joinOrganization,
    getAllUserInOrganization,
  }
})
