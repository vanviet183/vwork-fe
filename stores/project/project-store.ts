import { Project } from '~/models/class/common/project'
import { Task } from '~/models/class/common/task'
import { CreateProjectRequest } from '~/models/class/projects/create-project/create-project-request'
import { GetAllTaskInProjectRequest } from '~/models/class/projects/get-all-task-in-project/get-all-task-in-project-request'
import { GetProjectInfoRequest } from '~/models/class/projects/get-project-info/get-project-info-request'
import {
  createProjectApi,
  getAllTaskInProjectApi,
  getProjectInfoApi,
} from '~/services/project/project-service'

export const useProjectStore = defineStore('project', () => {
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  const projectInfo = ref<Project>()
  const listTask = ref<Task[]>()

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
      return true
      projectInfo.value = response.contents
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
      listTask.value = response.contents.listTask ?? []

      listTask.value?.sort((item1, item2) =>
        item2.status.localeCompare(item1.status)
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
    listTask,
    projectInfo,
    createProject,
    getProjectInfo,
    getAllTaskInProject,
  }
})
