import { AlertType } from '~/constants'
import type { Document } from '~/models/class/common/document'
import type { Meeting } from '~/models/class/common/meeting'
import { Task } from '~/models/class/common/task'
import type { User } from '~/models/class/common/user'
import { CreateProjectRequest } from '~/models/class/projects/create-project/create-project-request'
import { DeleteProjectRequest } from '~/models/class/projects/delete-project/delete-project-request'
import { EditProjectRequest } from '~/models/class/projects/edit-project/edit-project-request'
import { GetAllDocumentInProjectRequest } from '~/models/class/projects/get-all-document-in-project/get-all-document-in-project-request'
import { GetAllMeetingInProjectRequest } from '~/models/class/projects/get-all-meeting-in-project/get-all-meeting-in-project-request'
import { GetAllTaskInProjectRequest } from '~/models/class/projects/get-all-task-in-project/get-all-task-in-project-request'
import { GetAllUserInProjectRequest } from '~/models/class/projects/get-all-user-in-project/get-all-user-in-project-request'
import { GetProjectInfoRequest } from '~/models/class/projects/get-project-info/get-project-info-request'
import type { GetProjectInfoResponse } from '~/models/class/projects/get-project-info/get-project-info-response'
import {
  createProjectApi,
  deleteProjectApi,
  editProjectApi,
  getAllDocumentInProjectApi,
  getAllMeetingInProjectApi,
  getAllTaskInProjectApi,
  getAllUserInProjectApi,
  getProjectInfoApi,
} from '~/services/project/project-service'
import { useAlertStore } from '../alert/alert-store'

export const useProjectStore = defineStore('project', () => {
  const alertStore = useAlertStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  const projectInfo = ref<GetProjectInfoResponse>()
  const listTaskInProject = ref<Task[]>()
  const listDocumentInProject = ref<Document[]>()
  const listUserInProject = ref<User[]>()
  const listMeetingInProject = ref<Meeting[]>()

  async function getProjectInfo(projectId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetProjectInfoRequest(projectId)
      const response = await getProjectInfoApi(request)

      projectInfo.value = response.contents
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function deleteProject(projectId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new DeleteProjectRequest(projectId)
      const response = await deleteProjectApi(request)
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

  async function createProject(
    organizationId: number,
    userId: number,
    projectName: string,
    description: string,
    startDate: string,
    endDate: string
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new CreateProjectRequest(
        organizationId,
        userId,
        projectName,
        description,
        startDate,
        endDate
      )
      const response = await createProjectApi(request)
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

  async function editProject(
    projectId: number,
    projectName: string,
    description: string,
    startDate: string,
    endDate: string
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new EditProjectRequest(
        projectId,
        projectName,
        description,
        startDate,
        endDate
      )
      const response = await editProjectApi(request)
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

  async function getAllTaskInProject(projectId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetAllTaskInProjectRequest(projectId)
      const response = await getAllTaskInProjectApi(request)
      listTaskInProject.value = response.contents?.listTask ?? []

      listTaskInProject.value?.sort((item1, item2) =>
        item1.startDate.localeCompare(item2.startDate)
      )
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function getAllDocumentInProject(projectId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetAllDocumentInProjectRequest(projectId)
      const response = await getAllDocumentInProjectApi(request)
      listDocumentInProject.value = response.contents?.listDocument ?? []
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function getAllUserInProject(projectId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetAllUserInProjectRequest(projectId)
      const response = await getAllUserInProjectApi(request)
      listUserInProject.value = response.contents?.listUser ?? []
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function getAllMeetingInProject(projectId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetAllMeetingInProjectRequest(projectId)
      const response = await getAllMeetingInProjectApi(request)
      listMeetingInProject.value = response.contents?.listMeeting ?? []

      listMeetingInProject.value?.sort((item1, item2) =>
        item1.startTime.localeCompare(item2.startTime)
      )
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
    listTaskInProject,
    projectInfo,
    listDocumentInProject,
    listUserInProject,
    listMeetingInProject,
    createProject,
    getProjectInfo,
    getAllTaskInProject,
    deleteProject,
    getAllDocumentInProject,
    getAllUserInProject,
    getAllMeetingInProject,
    editProject,
  }
})
