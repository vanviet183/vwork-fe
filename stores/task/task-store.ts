import { Task } from '~/models/class/common/task'
import { CreateTaskRequest } from '~/models/class/tasks/create-task/create-task-request'
import { GetTaskInfoRequest } from '~/models/class/tasks/get-task-info/get-task-info-request'
import { createTaskApi, getTaskInfoApi } from '~/services/task/task-service'

export const useTaskStore = defineStore('task', () => {
  const isLoading = ref(false)
  const isError = ref(false)
  const error = ref('')

  const taskInfo = ref<Task>()

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
    userId: number,
    projectId: number,
    taskName: string,
    prioritize: boolean,
    startDate: string,
    endDate: string,
    parentTaskId?: number
  ) {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    isError.value = false
    try {
      const request = new CreateTaskRequest(
        userId,
        projectId,
        taskName,
        prioritize,
        startDate,
        endDate,
        parentTaskId
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

  return {
    isLoading,
    isError,
    error,
    taskInfo,
    createTask,
    getTaskInfo,
  }
})
