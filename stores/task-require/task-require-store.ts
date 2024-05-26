import { AlertType } from '~/constants'
import { CreateTaskRequireRequest } from '~/models/class/task-require/create-task-require/create-task-require-request'
import { DeleteTaskRequireRequest } from '~/models/class/task-require/delete-task-require/delete-task-require-request'
import { EditTaskRequireRequest } from '~/models/class/task-require/edit-task-require/edit-task-require-request'
import { GetTaskRequireInfoRequest } from '~/models/class/task-require/get-task-require-info/get-task-require-info-request'
import type { GetTaskRequireInfoResponse } from '~/models/class/task-require/get-task-require-info/get-task-require-info-response'
import { UpdateStatusTaskRequireRequest } from '~/models/class/task-require/update-status-task-require/update-status-task-require-request'
import {
  createTaskRequireApi,
  deleteTaskRequireApi,
  editTaskRequireApi,
  getTaskRequireInfoApi,
  updateStatusTaskRequireApi,
} from '~/services/task-require/task-require-service'
import { useAlertStore } from '../alert/alert-store'

export const useTaskRequireStore = defineStore('task-require', () => {
  const alertStore = useAlertStore()
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  const taskRequireInfo = ref<GetTaskRequireInfoResponse>()

  async function getTaskRequireInfo(taskRequireId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new GetTaskRequireInfoRequest(taskRequireId)
      const response = await getTaskRequireInfoApi(request)
      taskRequireInfo.value = response.contents
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function createTaskRequire(
    taskId: number,
    requireContent: string,
    startDate: string,
    endDate: string,
    listUserImplement: string,
    important: boolean
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new CreateTaskRequireRequest(
        taskId,
        requireContent,
        startDate,
        endDate,
        listUserImplement,
        important
      )
      const response = await createTaskRequireApi(request)
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

  async function deleteTaskRequire(taskRequireId: number) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new DeleteTaskRequireRequest(taskRequireId)
      const response = await deleteTaskRequireApi(request)
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

  async function editTaskRequire(
    taskRequireId: number,
    requireContent: string,
    important: boolean
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new EditTaskRequireRequest(
        taskRequireId,
        requireContent,
        important
      )
      const response = await editTaskRequireApi(request)
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

  async function updateStatusTaskRequire(
    taskRequireId: number,
    status: string
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new UpdateStatusTaskRequireRequest(taskRequireId, status)
      const response = await updateStatusTaskRequireApi(request)
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
    taskRequireInfo,
    createTaskRequire,
    getTaskRequireInfo,
    deleteTaskRequire,
    editTaskRequire,
    updateStatusTaskRequire,
  }
})
