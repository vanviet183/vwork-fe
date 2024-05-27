import { AlertType } from '~/constants'
import type { Organization } from '~/models/class/common/organization'
import type { Project } from '~/models/class/common/project'
import type { User } from '~/models/class/common/user'
import { InitOrganizationRequest } from '~/models/class/oranizations/create-organization/init-organization-request'
import { DeleteOrganizationRequest } from '~/models/class/oranizations/delete-organization/delete-organization-request'
import { GetAllProjectByOrganizationRequest } from '~/models/class/oranizations/get-all-project-by-organization/get-all-project-by-organization-request'
import { GetAllUserInOrganizationRequest } from '~/models/class/oranizations/get-all-user-in-organization/get-all-user-in-organization-request'
import { GetOrganizationInfoRequest } from '~/models/class/oranizations/get-organization-info/get-organization-info-request'
import { UpdateOrganizationRequest } from '~/models/class/oranizations/update-organization/update-organization-request'
import {
  deleteOrganizationApi,
  getAllOrganizationApi,
  getAllProjectsInOrganizationApi,
  getAllUserInOrganizationApi,
  getOrganizationInfoApi,
  initOrganizationApi,
  updateOrganizationApi,
} from '~/services/organization/organization-service'
import { useAlertStore } from '../alert/alert-store'

export const useOrganizationStore = defineStore('organization', () => {
  const alertStore = useAlertStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  const organizationInfo = ref<Organization>()

  // list organization
  const listAllOrganization = ref<Organization[]>()

  // list group
  const listUserInOrganization = ref<User[]>()

  // list project
  const listProjectInOrganization = ref<Project[]>()

  async function getAllProjectsInOrganization(organizationId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetAllProjectByOrganizationRequest(organizationId)
      const response = await getAllProjectsInOrganizationApi(request)

      listProjectInOrganization.value = response.contents?.listProject ?? []
    } catch (error) {
      isError.value = true
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

      listUserInOrganization.value = response.contents?.listUser ?? []
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function initOrganization(
    organizationName: string,
    description: string,
    email: string,
    phone: string,
    userId: number
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const initOrganiztionRequest = new InitOrganizationRequest(
        organizationName,
        description,
        email,
        phone,
        userId
      )
      const response = await initOrganizationApi(initOrganiztionRequest)
      if (response.message) {
        alertStore.setAlertMessage({
          message: response.message,
          type: AlertType.success,
        })
      }
      return true
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function updateOrganization(
    organizationId: number,
    organizationName: string,
    description: string,
    email: string,
    phone: string,
    userId: number
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new UpdateOrganizationRequest(
        organizationId,
        organizationName,
        description,
        email,
        phone,
        userId
      )
      const response = await updateOrganizationApi(request)
      if (response.message) {
        alertStore.setAlertMessage({
          message: response.message,
          type: AlertType.success,
        })
      }
      return true
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function deleteOrganization(projectId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new DeleteOrganizationRequest(projectId)
      const response = await deleteOrganizationApi(request)
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

  // async function joinOrganization(userId: number, organizationId: number) {
  //   if (isLoading.value) {
  //     return
  //   }
  //   isLoading.value = true
  //   isError.value = false
  //   try {
  //     const joinOrganiztionRequest = new JoinOrganizationRequest(
  //       userId,
  //       organizationId
  //     )
  //     const response = await joinOrganizationApi(joinOrganiztionRequest)
  //     if (response.contents) {
  //       organizationInfo.value = response.contents
  //       return true
  //     }
  //   } catch (error) {
  //     isError.value = true
  //     return false
  //   } finally {
  //     isLoading.value = false
  //   }
  // }

  async function getOrganizationInfo(organizationId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetOrganizationInfoRequest(organizationId)
      const response = await getOrganizationInfoApi(request)
      organizationInfo.value = response.contents
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function getAllOrganization() {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const response = await getAllOrganizationApi()
      listAllOrganization.value = response.contents?.listOrganization
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
    listUserInOrganization,
    listProjectInOrganization,
    listAllOrganization,
    initOrganization,

    getAllProjectsInOrganization,
    getOrganizationInfo,
    getAllUserInOrganization,
    getAllOrganization,
    deleteOrganization,
    updateOrganization,
  }
})
