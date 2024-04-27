import type { Group } from '~/models/class/common/group'
import type { Project } from '~/models/class/common/project'
import { User } from '~/models/class/common/user'
import { GetAllGroupInOrganizationRequest } from '~/models/class/oranizations/get-all-group-in-organization/get-all-group-in-organization-request'
import { InitOrganizationRequest } from '~/models/class/oranizations/init/init-organization-request'
import { InitOrganizationResponse } from '~/models/class/oranizations/init/init-organization-response'
import { JoinOrganizationRequest } from '~/models/class/oranizations/join/join-organization-request'
import { GetAllProjectByOrganizationRequest } from '~/models/class/projects/get-all-project-by-organization/get-all-project-by-organization-request'
import {
  getAllGroupInOrganizationApi,
  getAllProjectsInOrganizationApi,
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

  // list user
  const listUser = ref<User[]>()

  // list group
  const listGroup = ref<Group[]>()

  // list project
  const listProjects = ref<Project[]>()
  const listProjectCurrent = ref<Project[]>()
  const listProjectCompleted = ref<Project[]>()

  watch(listProjects, () => {
    listProjectCurrent.value = listProjects.value?.filter(
      (item) => item.status === 'Doing'
    )

    listProjectCompleted.value = listProjects.value?.filter(
      (item) => item.status === 'Completed'
    )
  })

  async function getAllProjectsInOrganization(organizationId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetAllProjectByOrganizationRequest(organizationId)
      const response = await getAllProjectsInOrganizationApi(request)

      listProjects.value = response.contents.listProject
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

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

  async function getAllGroupInOrganization(organizationId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetAllGroupInOrganizationRequest(organizationId)
      const response = await getAllGroupInOrganizationApi(request)
      listGroup.value = response.contents.listGroup
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
    listProjects,
    listProjectCurrent,
    listProjectCompleted,
    listGroup,
    initOrganization,
    joinOrganization,
    getAllGroupInOrganization,
    getAllProjectsInOrganization,
  }
})
