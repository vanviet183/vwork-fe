import { AlertType } from '~/constants'
import type { Document } from '~/models/class/common/document'
import type { TaskRequire } from '~/models/class/common/task-require'
import { CreateTaskRequest } from '~/models/class/tasks/create-task/create-task-request'
import { DeleteTaskRequest } from '~/models/class/tasks/delete-task/delete-task-request'
import { EditTaskRequest } from '~/models/class/tasks/edit-task/edit-task-request'
import { GetAllDocumentInTaskRequest } from '~/models/class/tasks/get-all-document-in-task/get-all-document-in-task-request'
import { GetAllTaskRequireInTaskRequest } from '~/models/class/tasks/get-all-task-require-in-task/get-all-task-require-in-task-request'
import { GetTaskInfoRequest } from '~/models/class/tasks/get-task-info/get-task-info-request'
import type { GetTaskInfoResponse } from '~/models/class/tasks/get-task-info/get-task-info-response'
import { UpdateTaskRequest } from '~/models/class/tasks/update-task/update-task-request'
import {
  createTaskApi,
  deleteTaskApi,
  editTaskApi,
  getAllDocumentInTaskApi,
  getAllTaskRequireInTaskApi,
  getTaskInfoApi,
  updateStatusTaskApi,
} from '~/services/task/task-service'
import { useAlertStore } from '../alert/alert-store'

export const useTaskStore = defineStore('task', () => {
  const alertStore = useAlertStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  const taskInfo = ref<GetTaskInfoResponse>()
  const listTaskRequire = ref<TaskRequire[]>()
  const listDocumentInTask = ref<Document[]>()

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
    phase: string,
    userResponsible: string,
    listUserImplement: number[],
    prioritize: string,
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
        phase,
        userResponsible,
        listUserImplement,
        prioritize,
        startDate,
        endDate
      )
      const response = await createTaskApi(request)
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

  async function editTask(
    taskId: number,
    taskName: string,
    phase: string,
    userResponsible: string,
    listUserImplement: number[],
    prioritize: string,
    startDate: string,
    endDate: string
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new EditTaskRequest(
        taskId,
        taskName,
        phase,
        userResponsible,
        listUserImplement,
        prioritize,
        startDate,
        endDate
      )
      const response = await editTaskApi(request)
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

  async function updateStatusTask(taskId: number, status: string) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new UpdateTaskRequest(taskId, status)
      const response = await updateStatusTaskApi(request)
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

  async function getAllTaskRequireInTask(taskId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetAllTaskRequireInTaskRequest(taskId)
      const response = await getAllTaskRequireInTaskApi(request)
      listTaskRequire.value = response.contents?.listTaskRequire ?? []
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
      listDocumentInTask.value = response.contents?.listDocument ?? []
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function deleteTask(taskId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new DeleteTaskRequest(taskId)
      const response = await deleteTaskApi(request)
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

  return {
    isLoading,
    isError,
    error,
    taskInfo,
    listTaskRequire,
    listDocumentInTask,
    createTask,
    editTask,
    getTaskInfo,
    getAllTaskRequireInTask,
    getAllDocumentInTask,
    updateStatusTask,
    deleteTask,
  }
})
