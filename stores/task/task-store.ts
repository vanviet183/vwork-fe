import type { Document } from '~/models/class/common/document'
import { Task } from '~/models/class/common/task'
import type { TaskRequire } from '~/models/class/common/task-require'
import { CreateTaskRequest } from '~/models/class/tasks/create-task/create-task-request'
import { GetAllDocumentInTaskRequest } from '~/models/class/tasks/get-all-document-in-task/get-all-document-in-task-request'
import { GetAllTaskRequireInTaskRequest } from '~/models/class/tasks/get-all-task-require-in-task/get-all-task-require-in-task-request'
import { GetTaskInfoRequest } from '~/models/class/tasks/get-task-info/get-task-info-request'
import { UpdateTaskRequest } from '~/models/class/tasks/update-task/update-task-request'
import {
  createTaskApi,
  getAllDocumentInTaskApi,
  getAllTaskRequireInTaskApi,
  getTaskInfoApi,
  updateStatusTaskApi,
} from '~/services/task/task-service'

export const useTaskStore = defineStore('task', () => {
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  const taskInfo = ref<Task>()
  const listTaskRequire = ref<TaskRequire[]>()
  const listDocument = ref<Document[]>()

  async function getTaskInfo(taskId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetTaskInfoRequest(taskId)
      const response = await getTaskInfoApi(request)
      taskInfo.value = response.contents
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function createTask(
    projectId: number,
    taskName: string,
    userResponsible: number | undefined,
    listUserImplement: number[],
    prioritize: boolean,
    startDate: string,
    endDate: string
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new CreateTaskRequest(
        projectId,
        taskName,
        userResponsible,
        listUserImplement,
        prioritize,
        startDate,
        endDate
      )
      const response = await createTaskApi(request)
      taskInfo.value = response.contents
      return true
    } catch (error) {
      isError.value = true
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function updateStatusTask(taskId: number, status: string) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new UpdateTaskRequest(taskId, status)
      await updateStatusTaskApi(request)
      return true
    } catch (error) {
      isError.value = true
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function getAllTaskRequireInTask(taskId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetAllTaskRequireInTaskRequest(taskId)
      const response = await getAllTaskRequireInTaskApi(request)
      listTaskRequire.value = response.contents.listTaskRequire ?? []
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function getAllDocumentInTask(taskId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetAllDocumentInTaskRequest(taskId)
      const response = await getAllDocumentInTaskApi(request)
      listDocument.value = response.contents.listDocument ?? []
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
    taskInfo,
    listTaskRequire,
    listDocument,
    createTask,
    getTaskInfo,
    getAllTaskRequireInTask,
    getAllDocumentInTask,
    updateStatusTask,
  }
})
