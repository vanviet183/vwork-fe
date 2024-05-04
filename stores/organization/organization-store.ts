import type { Group } from '~/models/class/common/group'
import type { Organization } from '~/models/class/common/organization'
import type { Project } from '~/models/class/common/project'
import { GetAllGroupInOrganizationRequest } from '~/models/class/oranizations/get-all-group-in-organization/get-all-group-in-organization-request'
import { GetAllProjectByOrganizationRequest } from '~/models/class/oranizations/get-all-project-by-organization/get-all-project-by-organization-request'
import { GetAllUserInOrganizationRequest } from '~/models/class/oranizations/get-all-user-in-organization/get-all-user-in-organization-request'
import type { UserGroup } from '~/models/class/oranizations/get-all-user-in-organization/get-all-user-in-organization-response'
import { GetOrganizationInfoRequest } from '~/models/class/oranizations/get-organization-info/get-organization-info-request'
import { InitOrganizationRequest } from '~/models/class/oranizations/init/init-organization-request'
import { JoinOrganizationRequest } from '~/models/class/oranizations/join/join-organization-request'
import {
  getAllGroupInOrganizationApi,
  getAllProjectsInOrganizationApi,
  getAllUserInOrganizationApi,
  getOrganizationInfoApi,
  initOrganizationApi,
  joinOrganizationApi,
} from '~/services/organization/organization-service'
import { useAlertStore } from '../alert/alert-store'

export const useOrganizationStore = defineStore('organization', () => {
  const alertStore = useAlertStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  const organizationInfo = ref<Organization>()

  // list group
  const listUser = ref<UserGroup[]>([])

  // list group
  const listGroup = ref<Group[]>([])

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

  // watch(listGroup, () => {
  //   listUser.value = listGroup.value.flatMap((entry) =>
  //     entry.users.map((user) => ({
  //       fullName: `${user.firstName} ${user.lastName}`,
  //       email: user.email,
  //       phone: user.phone,
  //       role: getPositionUser(user.role),
  //       group: entry.groupName === 'COMMON' ? 'Chưa có' : entry.groupName,
  //     }))
  //   )
  // })

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
      listGroup.value = response.contents.listGroup ?? []
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

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

  // function getPositionUser(role: string) {
  //   switch (role) {
  //     case ROLE.PROJECT_MANAGER:
  //       return 'Quản lý dự án'
  //     case ROLE.CEO:
  //       return 'CEO'
  //     case ROLE.TEAMLEAD:
  //       return 'Trưởng nhóm'
  //     case ROLE.EMPLOYEE:
  //       return 'Nhân viên'
  //     default:
  //       return ''
  //   }
  // }

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
    getOrganizationInfo,
    getAllUserInOrganization,
  }
})
