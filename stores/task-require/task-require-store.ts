import { Task } from '~/models/class/common/task'
import { CreateTaskRequireRequest } from '~/models/class/task-require/create-task-require/create-task-require-request'
import { GetTaskRequireInfoRequest } from '~/models/class/task-require/get-task-require-info/get-task-require-info-request'
import {
  createTaskRequireApi,
  getTaskRequireInfoApi,
} from '~/services/task-require/task-require-service'

export const useTaskRequireStore = defineStore('task-require', () => {
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  const taskRequireInfo = ref<Task>()

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
        important
      )
      const response = await createTaskRequireApi(request)
      taskRequireInfo.value = response.contents
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
  }
})
