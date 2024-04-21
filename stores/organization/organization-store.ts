import { InitOrganizationRequest } from '~/models/class/oranizations/init/init-organization-request'
import { InitOrganizationResponse } from '~/models/class/oranizations/init/init-organization-response'
import { JoinOrganizationRequest } from '~/models/class/oranizations/join/join-organization-request'
import {
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

  return {
    isLoading,
    isError,
    error,
    organizationInfo,
    initOrganization,
    joinOrganization,
  }
})
